class Api::V1::Stocks::StocksController < ApplicationController
  def index
    stocks = $redis.get("stocks")  
    if stocks.nil?
        user = User.first
        if user
            ledger = Ledger.where("user_id = ?", user.id).limit(10).order("created_at DESC").as_json
            assets = Asset.where("user_id = ?", user.id).first
            stocks = [ledger,assets].to_json
            $redis.set("stocks",stocks)
        else
            render json:{ledger:[], assets:[]}
            return
        end
    end
    stocks = JSON.parse(stocks)
    if stocks[0]
        stocks[0] = Ledger.mapEntries(stocks[0])
    end
    if stocks[1]
       stocks[1] = Asset.mapAssets(stocks[1])
    end
    render json:{ledger:stocks[0], assets:stocks[1]}
  end

  def read
      data = Stock.get_history(params[:stock])
      render json:{stock:data}
  end

  def new
  end
  def create
  end
end
