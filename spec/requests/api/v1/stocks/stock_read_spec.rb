describe "Stock API" do
  it 'gets historical prices of valid stock' do

    get '/api/v1/stocks/FB'

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure the right amount of messages are returned
    expect(json['stock'].length).to eq(252)
  end

  it 'gets historical prices of non valid stock' do

    get '/api/v1/stocks/testtest'

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure the right amount of messages are returned
    expect(json['stock']).to eq(nil)
  end
end