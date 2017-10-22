class Api::V1::Stocks::SellController < ApplicationController
  def read
    user = request.headers["Authorization"] ? User.find_by_token(request.headers["Authorization"].split(' ').last) : nil
    if user
        assets = Asset.where("user_id = ?", user.id).first
        if assets
            render json:{assets:assets}
        else
            render json: {}, status: :not_found
        end
    else
        render json:{}, status: :unauthorized
    end    
  end

  def create
      user = request.headers["Authorization"] ? User.find_by_token(request.headers["Authorization"].split(' ').last) : nil
      if user
        limit_amount = 10
        try_count = 0
        begin
            # LIFO
            stocks = Stock.where("ticker = ? AND closed = false AND user_id = ?", params[:ticker], user.id).order("created_at ASC").limit(limit_amount)
            if stocks.empty?
                render json:{message: "You don't own that stock"}, status: :bad_request
                return 
            end
            quantity_mapped = stocks.map(&:quantity).sum
            puts quantity_mapped
            if(stocks.map(&:quantity).sum < params[:quantity].to_i)
                raise "we need more stocks..."
            end
            i = 0
            quantity = 0
            quantity_not_satisfied = true
            while quantity_not_satisfied == true do 
                quant = stocks[i].remaining
                quantity += quant
                quantity_not_satisfied = (quantity >= params[:quantity].to_i) ? false : true
                i += 1
            end
            difference = stocks[0..i].map(&:remaining).sum - stocks[0...i].map(&:remaining).sum
            if difference > 0
                average = stocks[0...i].map{|x| x.remaining.to_f * x.purchase.to_f}.sum
                average += (stocks[i].purchase.to_f * difference)
                average /= (stocks[0...i].map(&:remaining).sum + difference)
                Stock.where("id in (?)", stocks[0...i].map(&:id)).update_all(closed:true, remaining:0)
                stocks[0...i].update_all(closed:true, remaining:0)
                Stock.where('id = ?', stocks[i].id).update(closed:true, remaining:difference)
            else
                average = (stocks[0..i].map{|x| x.remaining.to_f * x.purchase.to_f}.sum)/stocks[0..i].map(&:remaining).sum
                Stock.where("id in (?)", stocks[0..i].map(&:id)).update_all(closed:true, remaining:0)
            end
        rescue => e
            Rails.logger.info(e)
            limit_amount += 10
            try_count += 1
            if(try_count < 3)
                retry
            else
                render json:{message: "quantity too big."}, status: :internal_server_error
                return false
            end
        end

        ledger = Ledger.new
        assets = Asset.where("user_id = ?", user.id).first_or_create
        price = params[:price]
        if !price
            yahoo_client = YahooFinance::Client.new
            data = yahoo_client.quotes([params[:ticker]], [:ask, :bid, :last_trade_date, :more_info])
            price = data[0] ? data[0]['ask'] : nil
        end
        ledger.ticker = "$#{params[:ticker]}".upcase
        if price && price != 'N/A'
            if assets.data.try(:[], "$#{params[:ticker].upcase}")
                if((assets.data["$#{params[:ticker].upcase}"]['quantity'].to_i - params[:quantity].to_i ) < 0) 
                    render json:{message:"quantity needs to be equal to, or less, than #{assets.data["$#{params[:ticker].upcase}"]['quantity'].to_i}"}, status: :bad_request
                    return false
                end
                if assets.data["$#{params[:ticker].upcase}"].key?("sell_average")
                    assets.data["$#{params[:ticker].upcase}"]['sell_average'] = ((assets.data["$#{params[:ticker].upcase}"]['sell_average'].to_f*assets.data["$#{params[:ticker].upcase}"]['quantity'].to_f + (price.to_f * params[:quantity].to_f)) / (assets.data["$#{params[:ticker].upcase}"]['quantity'].to_f + params[:quantity].to_f))
                else
                    assets.data["$#{params[:ticker].upcase}"]['sell_average'] = price.to_f
                end
                assets.data["$#{params[:ticker].upcase}"]['quantity'] = assets.data["$#{params[:ticker].upcase}"]['quantity'].to_i - params[:quantity].to_i
                assets.data["$#{params[:ticker].upcase}"]['current'] = assets.data["$#{params[:ticker].upcase}"]['current'].to_f - (assets.data["$#{params[:ticker].upcase}"]['purchase_average'].to_f * params[:quantity].to_f)
                assets.data["$#{params[:ticker].upcase}"]['total']= assets.data["$#{params[:ticker].upcase}"]['quantity'].to_f * assets.data["$#{params[:ticker].upcase}"]['purchase_average']
                if(assets.data["$#{params[:ticker].upcase}"].try(:[],params['sold']))
                    sold_total = assets.data["$#{params[:ticker].upcase}"]['sold'].keys.length
                    assets.data["$#{params[:ticker.upcase]}"]['sold'][sold_total.to_s] = {"date"=>Time.now.to_i, "quantity" => params[:quantity]}
                else
                    assets.data["$#{params[:ticker].upcase}"]['sold'] = {}
                    assets.data["$#{params[:ticker].upcase}"]['sold']['0']={"date"=>Time.now.to_i, "quantity" => params[:quantity]}
                end
            else
                render json:{message:"You do not own that stock"}, status: :bad_request
                return false
            end
            if assets.data.try(:[], "Cash")
                cash = assets.data["Cash"].to_f
                assets.data["Cash"] = cash + (price.to_f * params[:quantity].to_f)
            else
                assets.data["Cash"] = (price.to_f * params[:quantity].to_f)
            end
            assets.current += ((price.to_f * params[:quantity].to_f) - (average.to_f * params[:quantity].to_f))
            assets.roi = ((assets.current.to_f/assets.beginning.to_f) -1) *100
            ### this beginning really should be calculated using the individual stocks themselves, not just the average.
            ledger.amount = (price.to_f * params[:quantity].to_f)
            ledger.user_id = user.id
            ledger.quantity = params[:quantity].to_i
            ledger.description = ActionView::Base.full_sanitizer.sanitize(params[:description])
            # user.
            $redis.del("stocks")
            if ledger.save && assets.save
                ledger_get = Ledger.where("user_id = ?", user.id).order("created_at DESC").limit(10)
                assets_get = Asset.where("user_id = ?", user.id).first
                render json: {ledger:Ledger.mapEntries(ledger_get.as_json),assets:Asset.mapAssets(assets_get.as_json)}, status: :ok
            else
                Rails.logger.info(ledger.errors.inspect) 
                Rails.logger.info(assets.errors.inspect) 
                Rails.logger.info(stock.errors.inspect) 
                render json: {}, status: :internal_server_error
            end
        else
            render json:{}, status: :bad_request
        end
      else
          render json: {}, status: :unauthorized
      end
  end
end
