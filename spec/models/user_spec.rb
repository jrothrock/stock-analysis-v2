require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new }

  it "is valid with valid attributes" do
    subject.username = "test"
    subject.password = "testpass"
    subject.email = "test@test.com"
    expect(subject).to be_valid
  end

  it "is not valid with non valid email attribute" do
    subject.username = "test"
    subject.password = "testpass"
    subject.email = "test"
    expect(subject).to be_invalid
  end

    it "is not valid with non valid username attribute" do
    subject.username = "test!!!"
    subject.password = "testpass"
    subject.email = "test"
    expect(subject).to be_invalid
  end
end
