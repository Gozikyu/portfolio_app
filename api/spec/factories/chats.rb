FactoryBot.define do
  factory :valid_chat, class: Chat do
    content { 'test' }
  end

  factory :invalid_chat, class: Chat do
    content { 'test' }
    user_id { nil }
    training_id { nil }
  end
end
