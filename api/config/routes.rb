# frozen_string_literal: true

Rails.application.routes.draw do
  get    '/login',   to: 'sessions#logged_in?'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  resources :users
end
