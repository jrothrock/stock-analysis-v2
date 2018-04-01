describe "Stocks API" do
  it 'gets assets and ledger' do
    user = FactoryBot.create(:user)
    ledger = FactoryBot.create(:ledger)
    assets = FactoryBot.create(:asset)
    get '/api/v1/stocks'

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure they exist
    expect(json['ledger']).not_to be_empty
    expect(json['assets']).not_to be_empty
  end
end