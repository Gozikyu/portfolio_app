# Create admin user
User.create!(name: 'admin',
             email: 'admin@gmail.com',
             password: 'password',
             gender: 'male',
             password_confirmation: 'password',
             admin: true)

User.create!(name: 'guest',
             email: 'guest@gmail.com',
             password: 'password',
             gender: 'female',
             password_confirmation: 'password',
             admin: false)

# No admin users
99.times do |n|
  gimei  = Gimei.name
  email = "example-#{n + 1}@gmail.com"
  password = 'password'
  User.create!(name: gimei.first.hiragana,
               email: email,
               gender: gimei.gender,
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

Gym.create!(name:'横浜市鶴見スポーツセンター',
            latitude: 35.52032106212692, 
            longitude: 139.6777366089135,
            url:'http://www.yspc.or.jp/tsurumi_sc_ysa/'
            )

Gym.create!(name:'大森スポーツセンター',
            latitude: 35.581060876815435, 
            longitude: 139.7374391645976,
            url:'https://omori-sc.jp'
            )

Gym.create!(name:'目黒区区民センター体育館　トレーニング室',
            latitude: 35.63692393892892, 
            longitude: 139.70842962256236,
            url:'http://www.city.meguro.tokyo.jp/shisetsu/shisetsu/sports_shisetsu/center_gym/center_ippan/center_training_ippankokai.html'
            )

Gym.create!(name:'港区スポーツセンター',
            latitude: 35.648015917292874, 
            longitude: 139.75237311023145,
            url:'http://www.minatoku-sports.com/'
            )

Gym.create!(name:'横浜市港北スポーツセンター',
            latitude: 35.517060206202565, 
            longitude: 139.6233043316416,
            url:'http://www.kohoku-sports.com/'
            )

Gym.create!(name:'渋谷区猿楽トレーニングジム',
            latitude: 35.65219235808604, 
            longitude: 139.70192520369417,
            url:'http://www.city.shibuya.tokyo.jp/est/sports/sp4_sarugaku.html'
            )

Gym.create!(name:'柴崎市民体育館',
            latitude: 35.68839956199398, 
            longitude: 139.4111721115961,
            url:'https://www.shiba-tai.jp/'
            )

Gym.create!(name:'駒沢オリンピック公園 体育館',
            latitude: 35.62494629388551, 
            longitude: 139.66100707295993,
            url:'https://www.tef.or.jp/kopgp/index.jspl'
            )

Gym.create!(name:'新宿区立 新宿スポーツセンター',
            latitude: 35.70762850583422, 
            longitude: 139.70549264193346,
            url:'http://www.shinjuku-sportscenter.com/'
            )
Gym.create!(name:'文京総合体育館',
            latitude: 35.70816117252878, 
            longitude: 139.7633426185985,
            url:'http://www.city.bunkyo.lg.jp/sosiki_busyo_sports_shisetsu_sougoutaiikukan.html'
            )

User.all.map{|user| 
  3.times do
    menu=['軽めに筋トレ','がっつり筋トレ','軽め派もがっつり派も歓迎'].sample
    location=Gym.all.sample.name
    partner=['male','female','both'].sample
    start_date=Date.parse('2021/3/1')
    end_date=Date.parse('2021/6/1')
    date=Random.rand(start_date..end_date)
    limit_number=[1,2,3].sample
    comment=['初心者大歓迎','ガッツリトレーニング希望です','女性限定！','気軽に参加してください！','定期的に一緒にできる方探してます'].sample

    user.trainings.create!(menu: menu, date: date, location: location, partner: partner, limit_number: limit_number, comment: comment)
  end
}

# user=User.first
# user_trainings=user.trainings.all
# users=User.all
first_user_id=User.first.id
prelast_user_id=User.last.id-2
users=User.all[0..prelast_user_id]
# trainings=Training.all

# followers=users[1..3]
# followingTs=trainings[3..5]
# followers.map{|follower|
#   user_trainings.map{|user_training|
#     follower.follow(user_training)
#   }
# }
# followingTs.map{|followingT|
#   user.follow(followingT)
# }

users.map{|user|
  next_id = user.id+1
  next_user=User.find(next_id)
  next_user_trainings=next_user.trainings.all
  next_user_trainings.map{|next_user_training|
    user.follow(next_user_training)
  }
}

