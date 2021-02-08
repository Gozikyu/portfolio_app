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
            latitude: 35.689467815981274, 
            longitude: 139.76783385524607,
            url: 'https://www.spst-chiyoda.jp'
            )

Gym.create!(name:'品川区立総合体育館',
            latitude: 35.62449209011926,
            longitude: 139.72876494113675,
            url:'http://www.ssa-or.biz/shisetsu/sougou/index.html'
            )
