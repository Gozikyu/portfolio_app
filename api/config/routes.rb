Rails.application.routes.draw do
  get '/gyms', to: 'gyms#index'
  post '/gyms', to: 'gyms#create'
  delete '/gyms/:id', to: 'gyms#destroy'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  get '/trainings', to: 'trainings#index'
  get '/trainings/:id', to: 'trainings#user_training'
  post '/trainings', to: 'trainings#create'
  post '/trainings/search', to: 'trainings#search'
  delete '/trainings/:id', to: 'trainings#destroy'
  get '/trainings/:id/followers', to: 'trainings#getting_followers'

  resources :users
  get 'users/trainings/:training_id', to: 'users#follow_training'
  get 'users/:user_id/trainings/:training_id', to: 'users#followed_training?'
  delete 'users/:user_id/trainings/:training_id', to: 'users#unfollow_training'

  get 'trainings/:id/chats', to: 'chats#show'
  post 'trainings/:id/chats', to: 'chats#create'
  delete 'trainings/:id/chats/:chat_id', to: 'chats#destroy'
end
