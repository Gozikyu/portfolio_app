FactoryBot.define do
  factory :gym, class: Gym do
    name { "Gym" }
    longitude { 90 }
    latitude { 0}
  end

  factory :valid_gym, class: Gym do
    name { "Valid Gym" }
    longitude { 90 }
    latitude { 0}
  end

  factory :invalid_gym, class: Gym do
    name { "" }
    longitude { 90 }
    latitude { 0}
  end


end
