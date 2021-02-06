# frozen_string_literal: true

# メインのサンプルユーザーを1人作成する
User.create!(name: 'admin',
             email: 'admin@gmail.com',
             password: 'password',
             password_confirmation: 'password',
             admin: true)

# 追加のユーザーをまとめて生成する
99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n + 1}@railstutorial.org"
  password = 'password'
  User.create!(name: name,
               email: email,
               password: password,
               password_confirmation: password,
               admin: false)
end

Gym.create!(name:'千代田区立スポーツセンター',
            longitude: 35.69162013055158, 
            latitude:139.76768223023518
            )

Gym.create!(name:'品川区立総合体育館',
            longitude: 35.62452448976542,
            latitude:139.72881284175224
            )
