describe "Authorization Sign Up API" do
  it 'registers valid user' do
    post '/api/v1/auth/signup', params: {username:"test", email:"test@test.com", password:"testpass", password_confirmation: "testpass"}

    json = JSON.parse(response.body)

    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure token is returned
    expect(json['token'])
  end

  it 'invalid user - invalid username' do
    post '/api/v1/auth/signup', params: {username:"%$%$%$%", email:"test@test.com", password:"testpass", password_confirmation: "testpass"}

    json = JSON.parse(response.body)

    # test for the 400 status-code
    expect(response).to be_bad_request

    expect(json['username']).to eq(true)
  end
  
  it 'invalid user - invalid email' do
    post '/api/v1/auth/signup', params: {username:"test", email:"test", password:"testpass", password_confirmation: "testpass"}

    json = JSON.parse(response.body)

    # test for the 400 status-code
    expect(response).to be_bad_request

    expect(json['email']).to eq(true)
  end
end