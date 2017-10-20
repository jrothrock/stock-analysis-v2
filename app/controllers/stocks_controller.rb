class StocksController < ApplicationController
  def new
  end
  def create
      user = request.headers["Authorization"] ? User.find_by_token(request.headers["Authorization"].split(' ').last) : nil
      if user
        stock = Stock.new
        stock.ticker = params[:ticker].upcase
        yahoo_client = YahooFinance::Client.new
        data = yahoo_client.quotes([stock.ticker], [:ask, :bid, :last_trade_date])
        stock.purchase = data[0].ask.to_f
        stock.user_id = user.id
        stock.description = ActionView::Base.full_sanitizer.sanitize(params[:description])
        if stock.save
            render json: {}, status: :ok
        else
            Rails.logger.info(stock.errors.inspect) 
            render json: {}, status: :internal_server_error
        end
      else
          render json: {}, status: :unauthorized
      end
  end
end
