# frozen_string_literal: true

Rails.application.routes.draw do
  get '/gyms',   to: 'gyms#index'
  post '/gyms',   to: 'gyms#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/trainings/:id',   to: 'trainings#show'
  post '/trainings',   to: 'trainings#create'
  delete '/trainings/:id',   to: 'trainings#destroy'
  resources :users
end
