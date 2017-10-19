# frozen_string_literal: true

class StocksController < ApplicationController
  layout "stocks"

  def index
    @stocks_props = { name: "Stranger", word: "Stocks" }
  end
end
