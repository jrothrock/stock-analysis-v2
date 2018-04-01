require 'rails_helper'

RSpec.describe Asset, type: :model do
  subject { described_class.new }

  it "is valid with valid attributes" do
    User.create({username:"test", password:"test", email:"test@test.com"})
    user = User.last
    subject.user_id = user.id
    subject.data = {"$GE"=>{"total"=>2738.0, "current"=>2700.0, "quantity"=>1, "purchases"=>{"0"=>{"date"=>1522280936, "price"=>"13.69", "quantity_holding"=>"150", "quantity_purchased"=>"150"}, "1"=>{"date"=>1522281787, "price"=>"13.69", "quantity_holding"=>"50", "quantity_purchased"=>"50"}}, "today_change"=>"$0.00", "current_price"=>"$13.50", "total_quantity"=>1, "yesterday_value"=>2700.0, "purchase_average"=>13.69}, "$NWL"=>{"total"=>2112.0, "current"=>2070.4, "quantity"=>80, "purchases"=>{"0"=>{"date"=>1522292367, "price"=>"26.40", "quantity_holding"=>"80", "quantity_purchased"=>"80"}}, "today_change"=>"$0.00", "current_price"=>"$25.88", "total_quantity"=>80, "yesterday_value"=>2070.4, "purchase_average"=>26.4}, "Cash"=>0, "$AMZN"=>{"sold"=>{"0"=>{"date"=>1522185207, "quantity"=>"1"}}, "total"=>0.0, "current"=>2.9500000000000455, "quantity"=>0, "purchases"=>{"0"=>{"date"=>1522185161, "price"=>"1497.05", "quantity_holding"=>"1", "quantity_purchased"=>"1"}}, "sell_average"=>1500.0, "today_change"=>"$2.95", "current_price"=>1500.0, "total_quantity"=>1, "yesterday_value"=>1500.0, "purchase_average"=>1497.05}, "$VRSN"=>{"total"=>1174.2, "current"=>1185.6, "quantity"=>10, "purchases"=>{"0"=>{"date"=>1522261164, "price"=>"117.42", "quantity_holding"=>"10", "quantity_purchased"=>"10"}}, "today_change"=>"$0.00", "current_price"=>"$118.56", "total_quantity"=>1, "yesterday_value"=>1185.6, "purchase_average"=>117.42}}
    expect(subject).to be_valid
  end
end
