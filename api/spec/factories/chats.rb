FactoryBot.define do
  factory :valid_chat, class: Chat do
    content { 'test' }
    user_id { 1 }
    training_id { 1 }
  end

  factory :invalid_chat, class: Chat do
    content { 'test' }
    user_id { nil }
    training_id { nil }
  end
end
