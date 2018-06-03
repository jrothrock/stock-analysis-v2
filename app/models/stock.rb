require 'nokogiri'
class Stock < ApplicationRecord
    belongs_to :user

    def self.get_history(symbol)
        graph_data = $redis.get("#{symbol}_graph")
        if graph_data.nil?
            graph_data = Stock.getGraphData(symbol)
            if graph_data
                $redis.set("#{symbol}_graph", graph_data.to_json)
                $redis.sadd("graph_keys", "#{symbol}_graph")
                return graph_data
            else
                return nil
            end
        else
            graph_data = JSON.parse(graph_data)
            return graph_data
        end
    end
    def self.reset_history(symbols)
        symbols.each do |symbol|
            symbol = symbol.include?("$") ? symbol.gsub("$","") : symbol
            graph_data = Stock.getGraphData(symbol)
            if graph_data
                $redis.del("#{symbol}_graph")
                $redis.set("#{symbol}_graph", graph_data.to_json)
            end
        end
    end

    def self.getGraphData(symbol)
        begin
            url = "https://finance.yahoo.com/quote/#{symbol}/history/"
            doc = Nokogiri::HTML(open(url))
            # this definitely won't last forever.
            match = doc.search("script").text.scan(/root.App.main = .*/)
            
            first = JSON.parse(match[0].to_s.split("root.App.main = ")[1].chomp(";"))
            graph_data = first["context"]["dispatcher"]["stores"]["HistoricalPriceStore"]["prices"].map{|val| if(val.key?("close")) then {"date"=>Date.strptime(val["date"].to_s, '%s').strftime("%Y%m%d"), "close"=>val["close"]} end}.compact
        rescue => e
            puts e
            return nil
        end
    end

    def self.getStockValue(stock, eastern_time_military_time=nil)
        begin
            url = "https://query1.finance.yahoo.com/v7/finance/quote?symbols=#{stock}&fields=ask,bid,price"
            doc = Nokogiri::HTML(open(url))
            json = JSON.parse(doc)['quoteResponse']['result'][0]
            if json['postMarketPrice'] != 0 && eastern_time_military_time && (eastern_time_military_time.to_f > 17 && eastern_time_military_time.to_f < 18)
                return json['postMarketPrice']
            elsif json['regularMarketPrice'] != 0
                return json['regularMarketPrice']
            elsif json['ask'] != 0
                return json['ask']
            elsif json['bid'] != 0
                return json['bid']
            else 
                return nil
            end
        rescue
            return nil
        end
    end
end
