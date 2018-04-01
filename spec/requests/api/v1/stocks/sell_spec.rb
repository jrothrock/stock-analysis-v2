describe "Stocks Sell API" do
  it 'get stocks to sell when stocks are available' do
    user = FactoryBot.create(:user)
    stock = FactoryBot.create(:stock)
    ledger = FactoryBot.create(:ledger)
    assets = FactoryBot.create(:asset)
    get '/api/v1/stocks/sell', params: nil, headers: {Authorization: "Bearer #{user.token}" }

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success
    expect(json['assets']['data']).not_to be_empty
  end

  it 'get stocks when stocks arent available' do
    user = FactoryBot.create(:user)
    stock = FactoryBot.create(:stock)
    ledger = FactoryBot.create(:ledger)
    get '/api/v1/stocks/sell', params: nil, headers: {Authorization: "Bearer #{user.token}" }

    json = JSON.parse(response.body)

    # test for the 404 status-code
    expect(response).to be_not_found
  end

  it 'get stocks when user isnt signed in' do
    user = FactoryBot.create(:user)
    stock = FactoryBot.create(:stock)
    ledger = FactoryBot.create(:ledger)
    assets = FactoryBot.create(:asset)
    get '/api/v1/stocks/sell'

    json = JSON.parse(response.body)

    # test for the 404 status-code
    expect(response).to be_unauthorized
  end

  it 'sell stock when stock is valid and has quantity' do
    user = FactoryBot.create(:user)
    stock = FactoryBot.create(:stock)
    ledger = FactoryBot.create(:ledger)
    assets = FactoryBot.create(:asset)
    ticker = assets['data'].keys[0]
    quantity = assets['data'][ticker]['quantity']
    price = assets['data'][ticker]['price']
    great = "great"
    good = "good"
    bad = "bad"
    ugly = "ugly"
    post '/api/v1/stocks/sell', params: {ticker: ticker.split("$")[1], quantity: 1, price: price, great:great, good:good, bad:bad, ugly:ugly}, headers: {Authorization: "Bearer #{user.token}" }
    json = JSON.parse(response.body)
    expect(response).to be_success
  end

  it 'sell stock that user doesnt have' do
    user = FactoryBot.create(:user)
    stock = FactoryBot.create(:stock)
    ledger = FactoryBot.create(:ledger)
    assets = FactoryBot.create(:asset)
    ticker = assets['data'].keys[0]
    quantity = assets['data'][ticker]['quantity']
    price = assets['data'][ticker]['price']
    great = "great"
    good = "good"
    bad = "bad"
    ugly = "ugly"
    post '/api/v1/stocks/sell', params: {ticker: "X", quantity: 1, price: price, great:great, good:good, bad:bad, ugly:ugly}, headers: {Authorization: "Bearer #{user.token}" }
    json = JSON.parse(response.body)
    expect(response).to be_bad_request
  end
end