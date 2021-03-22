# frozen_string_literal: true

FactoryBot.define do
  factory :user, class: User do
    name { 'Hoge' }
    email { 'hoge@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { true }
  end

  factory :Another, class: User do
    name { 'Another' }
    email { 'another@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { false }
  end

  factory :Another2, class: User do
    name { 'Another2' }
    email { 'another2@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { false }
  end

  factory :UpdatedUser, class: User do
    name { 'Hoge' }
    email { 'update@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { false }
  end

  factory :NamelessUser, class: User do
    name {}
    email { 'nameless@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { false }
  end

  factory :SignupUser, class: User do
    name { 'Signup' }
    email { 'signup@gmail.com' }
    password { 'password' }
    password_confirmation { 'password' }
    admin { false }
  end
end
