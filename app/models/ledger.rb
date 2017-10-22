include ActionView::Helpers::NumberHelper
include ActionView::Helpers::DateHelper
class Ledger < ApplicationRecord
    self.table_name = "ledger"
    belongs_to :user

    def self.mapEntries(entries)
        entries.each do |x|
            x['amount'] = number_to_currency(x['amount'].to_f)
            x['time_ago'] = time_ago_in_words(x['created_at'])
            x['created_at'] = x['created_at'].to_date.strftime("%F")
        end
    end

end
