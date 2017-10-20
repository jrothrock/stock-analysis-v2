class HomeController < ApplicationController
  def index
    @stocks_props = { name: "Stranger", word: "Stocks" }
  end
end
