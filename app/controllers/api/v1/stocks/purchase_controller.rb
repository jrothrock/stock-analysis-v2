class Api::V1::Stocks::PurchaseController < ApplicationController
  def create
      user = request.headers["Authorization"] ? User.find_by_token(request.headers["Authorization"].split(' ').last) : nil
      if user
        ledger = Ledger.new
        stock = Stock.new
        assets = Asset.where("user_id = ?", user.id).first_or_create
        assets.user_id = user.id
        price = params[:price]
        if !price
            price = Stock.getStockValue(params[:ticker])
        end
        ledger.ticker = "$#{params[:ticker]}".upcase
        ledger.purchase = true
        if price && price != 'N/A' 
            if assets.data.try(:[], "$#{params[:ticker].upcase}")
                assets.data["$#{params[:ticker].upcase}"]['total_quantity'] = assets.data["$#{params[:ticker].upcase}"]['total_quantity'].to_i + params[:quantity].to_i
                assets.data["$#{params[:ticker].upcase}"]['quantity'] = assets.data["$#{params[:ticker].upcase}"]['quantity'].to_i + params[:quantity].to_i
                assets.data["$#{params[:ticker].upcase}"]['total'] = assets.data["$#{params[:ticker].upcase}"]['total'].to_f + (price.to_f * params[:quantity].to_f)
                assets.data["$#{params[:ticker].upcase}"]['current'] = assets.data["$#{params[:ticker].upcase}"]['current'].to_f + (price.to_f * params[:quantity].to_f)
                assets.data["$#{params[:ticker].upcase}"]['current_price'] = price.to_f
                assets.data["$#{params[:ticker].upcase}"]['purchase_average'] = (assets.data["$#{params[:ticker].upcase}"]['total'].to_f / assets.data["$#{params[:ticker].upcase}"]['quantity'].to_f)
                assets.data["$#{params[:ticker].upcase}"]['yesterday_value'] = assets.data["$#{params[:ticker].upcase}"]['current']
                assets.data["$#{params[:ticker].upcase}"]['today_change'] = "$0.00"
                total_purchases = assets.data["$#{params[:ticker].upcase}"]['purchases'].keys.length
                assets.data["$#{params[:ticker].upcase}"]['purchases'][total_purchases.to_s]={"date" => Time.now.to_i, "quantity_purchased"=>params[:quantity], "price"=>price, "quantity_holding"=>params[:quantity]}
            else
                assets.data = (assets.data && assets.data.is_a?(Hash)) ? assets.data : {}
                assets.data["$#{params[:ticker].upcase}"]={}
                assets.data["$#{params[:ticker].upcase}"]["total_quantity"]=params[:quantity].to_i
                assets.data["$#{params[:ticker].upcase}"]['quantity']=params[:quantity].to_i
                assets.data["$#{params[:ticker].upcase}"]['total']= (price.to_f * params[:quantity].to_f)
                assets.data["$#{params[:ticker].upcase}"]['current']= (price.to_f * params[:quantity].to_f)
                assets.data["$#{params[:ticker].upcase}"]['current_price'] = price.to_f
                assets.data["$#{params[:ticker].upcase}"]['purchase_average']=(assets.data["$#{params[:ticker].upcase}"]['total'].to_f / assets.data["$#{params[:ticker].upcase}"]['quantity'].to_f)
                assets.data["$#{params[:ticker].upcase}"]['yesterday_value'] = assets.data["$#{params[:ticker].upcase}"]['current']
                assets.data["$#{params[:ticker].upcase}"]['today_change'] = "$0.00"
                if !assets.data["$#{params[:ticker].upcase}"]['purchases']
                    assets.data["$#{params[:ticker].upcase}"]['purchases']={}
                end
                assets.data["$#{params[:ticker].upcase}"]['purchases']['0']={"date" => Time.now.to_i, "quantity_purchased"=>params[:quantity], "price"=>price, "quantity_holding"=>params[:quantity]}
            end
            if (assets.data.try(:[],"Cash").to_f > (price.to_f * params[:quantity].to_f))
                cash = assets.data["Cash"].to_f
                assets.data["Cash"] = cash - (price.to_f * params[:quantity].to_f)
            elsif (assets.data.try(:[], "Cash").to_f > 0)
                remainder = (price.to_f * params[:quantity].to_f) - assets.data["Cash"].to_f
                assets.data["Cash"]=0
                assets.current += remainder.to_f
                assets.beginning += remainder.to_f
                assets.total += remainder.to_f
            else
                assets.current += (price.to_f * params[:quantity].to_f)
                assets.beginning += (price.to_f * params[:quantity].to_f)
                assets.total += (price.to_f * params[:quantity].to_f)
                # this doesn't feel right, however, I'm going to leave it for now.
                # the only reason I'm leaving in this is due to the "addition factor" for assets. Like if you just added a new stock. No ROI for it yet, but the numbers look weird together.
                assets.roi = ((assets.current.to_f/assets.beginning.to_f) -1) *100
            end
            stock.user_id = user.id
            stock.ticker = params[:ticker].upcase
            stock.purchase = price.to_f
            stock.quantity = params[:quantity].to_i
            stock.remaining = params[:quantity].to_i
            ledger.amount = params[:price].to_f * params[:quantity].to_f
            ledger.user_id = user.id
            ledger.quantity = params[:quantity].to_i
            ledger.purchase_price = params[:price].to_f
            ledger.purchase_date = Time.now
            ledger.the_great = ActionView::Base.full_sanitizer.sanitize(params[:great])
            ledger.the_good = ActionView::Base.full_sanitizer.sanitize(params[:good])
            ledger.the_bad = ActionView::Base.full_sanitizer.sanitize(params[:bad])
            ledger.the_ugly = ActionView::Base.full_sanitizer.sanitize(params[:ugly])
            $redis.del("stocks")
            if ledger.save && assets.save && stock.save
                ledger = Ledger.where("user_id = ?", user.id).order("created_at DESC").limit(10)
                assets = Asset.where("user_id = ?", user.id).first
                render json: {ledger:Ledger.mapEntries(ledger.as_json), assets:Asset.mapAssets(assets.as_json)}, status: :ok
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
