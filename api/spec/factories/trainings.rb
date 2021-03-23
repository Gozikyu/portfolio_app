FactoryBot.define do
  factory :training, class: Training do
    menu { 'ベンチプレス' }
    date { '2021-02-08' }
    location { 'Gym1' }
    partner { 'female' }
    limit_number { 1 }
  end

  factory :valid_training, class: Training do
    menu { 'スクワット' }
    date { '2021-02-09' }
    location { 'Gym2' }
    partner { 'male' }
    limit_number { 1 }
  end

  factory :invalid_training, class: Training do
    menu { 'スクワット' }
    date {}
    location { 'Gym2' }
    partner { 'male' }
    limit_number { 1 }
  end
end
