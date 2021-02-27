# frozen_string_literal: true

Rails.application.routes.draw do
  get '/gyms', to: 'gyms#index'
  post '/gyms', to: 'gyms#create'
  delete '/gyms/:id', to: 'gyms#destroy'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get '/trainings', to: 'trainings#index'
  get '/trainings/:id', to: 'trainings#show'
  post '/trainings', to: 'trainings#create'
  post '/trainings/search', to: 'trainings#search'
  delete '/trainings/:id', to: 'trainings#destroy'
  resources :users
end
