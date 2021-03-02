# frozen_string_literal: true

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
  get '/trainings/:id/followers', to: 'trainings#get_followers'
  resources :users
  post 'users/:user_id/trainings/:training_id', to: 'users#follow_training'
  get 'users/:user_id/trainings/:training_id', to: 'users#followed_training?'
  delete 'users/:user_id/trainings/:training_id', to: 'users#unfollow_training'
end
