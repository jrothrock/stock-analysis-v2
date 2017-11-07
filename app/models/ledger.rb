include ActionView::Helpers::NumberHelper
include ActionView::Helpers::DateHelper
class Ledger < ApplicationRecord
    self.table_name = "ledger"
    belongs_to :user

    def self.mapEntries(entries)
        entries.each do |x|
            x['amount'] = number_to_currency(x['amount'].to_f)
            x['time_ago'] = time_ago_in_words(x['created_at'])
            x['created_at'] = Ledger.set_in_timezone(x['created_at']).strftime("%F")
            x['purchase_date'] = Ledger.set_in_timezone(x['created_at']).strftime("%F")
            x['sale_date'] = Ledger.set_in_timezone(x['created_at']).strftime("%F")
            x['purchase_price'] = number_to_currency(x['purchase_price'].to_f)
            x['sale_price'] = number_to_currency(x['sale_price'].to_f)
        end
    end

    def self.set_in_timezone(time, zone='America/New_York')
        Time.use_zone(zone) { time.to_datetime.change(offset: Time.zone.now.strftime("%F")) }
    end

end
