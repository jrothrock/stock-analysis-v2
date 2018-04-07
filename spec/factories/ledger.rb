FactoryBot.define do
  factory :ledger do
    ticker '$GE'
    purchase true
    amount 19.99
    the_great "Great"
    the_good "Good"
    the_bad "Bad"
    the_ugly "Ugly"
    quantity 1
    id 1
    user_id 1
  end
end