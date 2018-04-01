require 'rails_helper'

RSpec.describe Stock, type: :model do
  subject { described_class.new }

  it "is valid with valid attributes" do
    User.create({username:"test", password:"test", email:"test@test.com"})
    user = User.last
    subject.ticker = "FB"
    subject.purchase = 19.99
    subject.quantity = 1
    subject.user_id = user.id
    expect(subject).to be_valid
  end
end
