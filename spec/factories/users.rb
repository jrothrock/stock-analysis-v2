FactoryBot.define do
  factory :user do
    email 'test@test.com'
    username 'test'
    login_username 'test'
    password 'testpass'
    id 1
  end
end