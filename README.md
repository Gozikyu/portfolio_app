# アプリの概要

一緒に筋トレをする人を見つける筋トレ仲間マッチングアプリ。  
トレーニングするジムの場所、日時などを入力して自分のトレーニングを登録。  
もしくは、他の人が登録しているトレーニングを検索し、気になったトレーニングがあれば参加申請をする。  
参加希望者が集まったら、トレーニングごとのチャットで詳細な集合場所などを決める。  
マイページではカレンダーに自分が参加予定のトレーニングが記入されているので、いつどのトレーニングに参加予定なのかひと目で分かる。

# アプリの使用イメージ動画

# 開発背景
私は時々筋トレをするのですが、一緒にトレーニングをしてくれる人がいません。ベンチプレスなど力尽きてつぶれた時の補助をしてくれる人がいないので、重量を軽めに設定してまい、なかなか追い込めません。また、一人だとモチベーションも続きづらいです。
特に社会人の方は一緒にトレーニングをする人がおらず、私と同様の悩みを持っている人が多いと思い、実際に回りの人に聞き込みをすると同じ意見を持つ人が複数人おりました。このアプリを使うことで上記のような悩みを解決できると考えました。

# 機能一覧
- サインイン機能
- サインアップ機能  
- トレーニング登録機能  
- トレーニング検索機能  
- トレーニング参加申請、取り消し機能
- チャット機能 (トレーニングごとのチャットグループ、参加者のみ閲覧、投稿可能)  
- カレンダーに参加予定トレーニング一覧表示機能  
- 新規ジム登録機能  
- ジムの場所のGoogle Mapへ表示機能  
- レスポンシブルデザイン  

# 使用技術
- バックエンド：Ruby2.6.6 、Rails 6.1.3.1  
  - 静的コード解析:rubocop  
  - テスト:rspec  
- フロントエンド：React  
- Webサーバー：Nginx  
- アプリケーションサーバー：puma  
- インフラ：AWS（VPC、EC2、RDB）  
- 開発環境：docker、docker-compose
- CI/CD:CircleCI
- バージョン管理：git、github
- データベース：MySQL  

# AWS構成図
![インフラ構成図](https://user-images.githubusercontent.com/53566393/116804902-9ed50180-ab5d-11eb-84b4-e1c2c2b1212b.png)

# 苦労したこと
フロントエンドにReactを使用したこと  
- なぜ苦労したのか？  
バックエンドにRailsフロントエンドにReactを使用した環境での開発を体系的に一から記載している参考書、サイトなどがなかったためです。
- どのように対処したか？  
エラーが起こったとき、まずはエラー文や正常に動いていたときとそうでないときのコードの差分から原因の仮説を立て、そして、その仮説が正しいのかコードを修正して、検証しました。  
- 解決までの過程で何が身についたか？  
自走能力が身についたと考えています。なぜなら、周囲に助けてくれる人がいない状況下で、何が原因かわからないエラーに直面したときでも、仮説立案とその検証を繰り返し行い解決することができたからです。

# 今後実装したい機能
- 安心して利用するために  
  - トレーニング後のユーザーの評価  
  - ユーザーのトレーニング実績表示  
  - トレーニングホストの参加者排除機能権限  
- より便利にするために  
	- 地域ごとのコミュニティ機能  
	- 自分のトレーニング実績、負荷記録機能  
	- トレーニング、ジムのtips投稿機能  



