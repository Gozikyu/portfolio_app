
FactoryBot.define do
  factory :training, class: Training do
    menu { "ベンチプレス" }
    date { "2021-02-08" }
    location { "Gym1" }
    partner { "both" }
  end
end
