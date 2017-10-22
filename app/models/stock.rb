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
            first = JSON.parse(doc.search('script')[22].to_s.split("root.App.main = ")[1].split('(this)')[0].chomp(";\n}"))
            graph_data = first["context"]["dispatcher"]["stores"]["HistoricalPriceStore"]["prices"].map{|val| if(val.key?("close")) then {"date"=>Date.strptime(val["date"].to_s, '%s').strftime("%Y%m%d"), "close"=>val["close"]} end}.compact
        rescue
            return nil
        end
    end

    def self.getStockValue(stock)
        yahoo_client = YahooFinance::Client.new
        data = yahoo_client.quotes([stock], [:ask])
        price = data[0] ? data[0]['ask'] : nil
    end
end
