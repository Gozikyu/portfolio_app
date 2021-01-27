# frozen_string_literal: true

FactoryBot.define do
  factory :user, class: User do
    name { 'Hoge' }
    email { 'hoge@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin {true}
  end

  factory :Another, class: User do
    name { 'Another' }
    email { 'another@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin {false}
  end

  factory :UpdatedUser, class: User do
    name {'Hoge'}
    email { 'update@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin {false}
  end


  factory :namelessUser, class: User do
    name {}
    email { 'hoge@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin {false}
  end
end
