# Create admin user
User.create!(name: 'admin',
             email: 'admin@gmail.com',
             password: 'password',
             password_confirmation: 'password',
             admin: true)

# No admin users
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

# Sample gyms
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

# Sample trainings
user = User.first
another= User.second

menu1 = 'ベンチプレス'
menu2='スクワット'
date1 = DateTime.now
date2=DateTime.now + 3.days
location1 = 'hoge gym'
location2='foo gym'
partner1 = 'both'
partner2 = 'male'

user.trainings.create!(menu: menu1, date: date1, location: location1, partner: partner1)
another.trainings.create!(menu: menu2, date: date2, location: location2, partner: partner2)

# 50.times do
#   menu = 'ベンチプレス'
#   date = DateTime.now
#   location = 'hoge gym'
#   partner = 'both'
#   users.each {|user| user.trainings.create!(menu: menu, date: date, location: location, partner: partner)}
# end
