describe "Stocks Buy API" do
  it 'buy stocks when user logged in' do
    user = FactoryBot.create(:user)
    post '/api/v1/stocks/purchase', params: {ticker:"GE", quantity: 1, price: 13.69, great:"Great", good:"Good", bad: "Bad", ugly: "Ugly"}, headers: {Authorization: "Bearer #{user.token}" }

    json = JSON.parse(response.body)
    # test for the 200 status-code
    expect(response).to be_success
    expect(json['ledger']).not_to be_empty
    expect(json['assets']).not_to be_empty
  end
  it 'buy stocks when user isnt logged in' do
    post '/api/v1/stocks/purchase', params: {ticker:"GE", quantity: 1, price: 13.69, great:"Great", good:"Good", bad: "Bad", ugly: "Ugly"}

    json = JSON.parse(response.body)

    # test for the 401 status-code
    expect(response).to be_unauthorized
  end
end