require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  describe "GET /logged_in?" do
    it "returns http success" do
      get "/login"
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /create' do
    it 'login with valid information' do
      FactoryBot.create(:user)
      post '/login', params: { user: {email: 'hoge@gmail.com', password: 'password'} } 
      expect(response).to have_http_status(200)
    end

    it 'login with invalid information' do
      FactoryBot.create(:user)
      post '/login', params: { user: {email: '', password: ''} } 
      expect(response).to have_http_status(404)
    end

    it 'remember user by session' do
      FactoryBot.create(:user)
      post '/login', params: { user: {email: 'hoge@gmail.com', password: 'password'} } 
      expect(session[:user_id].nil?).to be false
    end 
  end
end
