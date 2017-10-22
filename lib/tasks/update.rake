namespace :update do
desc "update statistics and graphs"
	task :generate => :environment do
        begin
            eastern_time = DateTime.now.utc.in_time_zone('Eastern Time (US & Canada)')
            eastern_time_day = eastern_time.strftime("%A")
            # this will make 9:30am, 9.30, so all calculations/equalities need to take that into consideration
            eastern_time_military_time = eastern_time.strftime("%H.%M")
            week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            # going to allow till 18, so that the graphs can update with after market stuff.
            if week_days.include?(eastern_time_day) && (eastern_time_military_time.to_f > 9.30 && eastern_time_military_time.to_f < 18)
                # stocks = Stock.select("ticker").where("user_id = ?", 1).map(&:ticker).uniq
                user = User.where("login_username = ?", "jack").first
                stocks = Ledger.where("user_id = ?", user.id).limit(100).map(&:ticker).uniq
                Stock.reset_history(stocks)
                assets = Asset.where("user_id = ?", user.id).first
                stocks = Stock.where("user_id = ? AND closed = false", user.id)
                cash = assets.data.key?("Cash") ? assets.data["Cash"].to_f : 0
                total_assets = cash
                stocks.each do |stock|
                    quantity = stock.remaining
                    price = Stock.getStockValue(stock)
                    ## in case yahoo goes down.
                    if price
                        total_assets += (quantity.to_f * price.to_f)
                    else
                        return false
                    end
                end
                assets.current = total_assets
                assets.today = total_assets.to_f - assets.yesterday.to_f
            end

            if week_days.include?(eastern_time_day) && (eastern_time_military_time.to_f > 17 && eastern_time_military_time.to_f < 18)
                assets.yesterday = assets.current
            end

            assets.save
        rescue => e
            puts "---BEGIN---"
            puts "Error in update rake"
            puts "Time: #{Time.now}"
            puts e
            puts e.backtrace
            puts "---END---"
        end
	end
end