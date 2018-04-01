describe "Authorization Log Out API" do
  it 'signs out valid user' do
    user = FactoryBot.create(:user)
    post '/api/v1/auth/signout', params: nil, headers: {Authorization: "Bearer #{user.token}" }

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

  end
    it 'signs out invalid/non-existing user' do
    post '/api/v1/auth/signout', params: nil, headers: {Authorization: "Bearer asdfasdf" }

    json = JSON.parse(response.body)
    # test for the 404 status-code
    expect(response).to be_unauthorized

  end
end