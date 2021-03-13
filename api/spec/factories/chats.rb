FactoryBot.define do
  factory :chat do
    content { "MyText" }
    user { nil }
    training { nil }
  end
end
