require 'rails_helper'

RSpec.describe Ledger, type: :model do
  subject { described_class.new }

  it "is valid with valid attributes" do
    User.create({username:"test", password:"test", email:"test@test.com"})
    user = User.last
    subject.ticker = "$FB"
    subject.purchase = true
    subject.amount = 19.99
    subject.quantity = 1
    subject.user_id = user.id
    subject.the_great = "great"
    subject.the_good = "good"
    subject.the_bad = "bad"
    subject.the_ugly = "ugly"
    expect(subject).to be_valid
  end
end
