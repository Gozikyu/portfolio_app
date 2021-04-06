# portfolio_app

app using rails and react

# prepage for push to remote main

docker-compose.yml

- command: bundle exec puma -C config/puma.rb -e production
- comment out db container and depend 'db' at app container

database.yml

- change MySQL server '127.0.0.1' from 'db'

.env.development

- change REACT_APP_HOST 'Elastic IP' from 'http://localhost'
