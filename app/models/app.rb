class App < ApplicationRecord
    def self.purge_cache
        $redis.del("stocks")
        $redis.smembers("graph_keys").each do |key|
            $redis.del(key)
        end
        $redis.del("graph_keys")
    end
end
