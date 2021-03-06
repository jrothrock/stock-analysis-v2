include ActionView::Helpers::NumberHelper
include ActionView::Helpers::DateHelper
class Asset < ApplicationRecord
    self.table_name = "assets"
    belongs_to :user

    def self.mapAssets(assets)
        assets['data'].each do |x,v|
            if(x != 'Cash' && x != "yahoo_down" && x != "yahoo_down_date")
            v['current'] = number_to_currency(v['current'].to_f)
            v['purchase_average'] = number_to_currency(v['purchase_average'].to_f)
            v['total'] = number_to_currency(v['total'].to_f)
            elsif x == "Cash"
            assets['data']['Cash'] = number_to_currency(v)
            end
        end
        assets["current"] = number_to_currency(assets["current"])
        assets["beginning"] = number_to_currency(assets["beginning"])
        assets["today"] = number_to_currency(assets["today"])
        assets
    end
end
