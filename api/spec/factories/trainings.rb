FactoryBot.define do
  factory :training, class: Training do
    menu { 'ベンチプレス' }
    date { '2021-02-08' }
    location { 'Gym1' }
    partner { 'female' }
  end

  factory :valid_training, class: Training do
    menu { 'スクワット' }
    date { '2021-02-09' }
    location { 'Gym2' }
    partner { 'male' }
  end

  factory :invalid_training, class: Training do
    menu { 'スクワット' }
    date {}
    location { 'Gym2' }
    partner { 'male' }
  end
end
