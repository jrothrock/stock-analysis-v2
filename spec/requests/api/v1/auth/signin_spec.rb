describe "Authorization Sign In API" do
  it 'logs in valid user' do
    user = FactoryBot.create(:user)
    post '/api/v1/auth/signin', params: {username:'test', password:'testpass'}

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure token is returned
    expect(json['token'])
  end

  it 'try to log in non existing user' do
    user = FactoryBot.create(:user)
    post '/api/v1/auth/signin', params: {username:'asdfasdfasdf',password:'testpass'}

    json = JSON.parse(response.body)

    # test for the 404 status-code
    expect(response).to be_not_found
  end

  it 'try to log in valid existing user with wrong password' do
    user = FactoryBot.create(:user)
    post '/api/v1/auth/signin', params: {username:user.username,password:'asdfasdfasdf'}

    json = JSON.parse(response.body)

    # test for the 404 status-code
    expect(response).to be_not_found
  end
end