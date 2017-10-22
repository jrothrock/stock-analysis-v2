include ActionView::Helpers::NumberHelper
include ActionView::Helpers::DateHelper
class Asset < ApplicationRecord
    self.table_name = "assets"
    belongs_to :user

    def self.mapAssets(assets)
        assets['data'].each do |x,v|
            if(x != 'Cash')
              v['current'] = number_to_currency(v['current'].to_f)
              v['purchase_average'] = number_to_currency(v['purchase_average'].to_f)
              v['total'] = number_to_currency(v['total'].to_f)
            else 
              assets['data']['Cash'] = number_to_currency(v)
            end
        end
        assets["current"] = number_to_currency(assets["current"])
        assets["beginning"] = number_to_currency(assets["beginning"])
        assets
    end
end
