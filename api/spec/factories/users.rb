FactoryBot.define do
  factory :user , class: User do
    name { "Hoge" }
    email { "hoge@gmail.com" }
    password {'password'}
    password_confirmation {'password'}
  end

  factory :namelessUser , class: User do
    name {  }
    email { "hoge@gmail.com" }
    password {'password'}
    password_confirmation {'password'}
  end

end
