require 'rails_helper'

RSpec.describe "Sessions", type: :request do

  describe "GET /new" do
    it "returns http success" do
      get "/login"
      expect(response).to have_http_status(:success)
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
      expect(response).to have_http_status(204)
    end
  end

end
