# frozen_string_literal: true

Rails.application.routes.draw do
  get 'gyms/index'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
end
