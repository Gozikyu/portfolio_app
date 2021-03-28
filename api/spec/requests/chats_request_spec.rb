require 'rails_helper'

RSpec.describe 'Chats', type: :request do
  before do
    @user = FactoryBot.create(:user)
    @another = FactoryBot.create(:Another)
    @training = @user.trainings.create(FactoryBot.attributes_for(:valid_training))
    @chat = @user.chats.create(content: 'test', user_id: @user.id, training_id: @training.id, user_name:@user.name)
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      get "/chats/#{@training.id}"
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    it 'can chat at following trainings' do
      @another.follow(@training)
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      expect do
        post '/chats', params: { chat: {
          content: 'test',
          training_id: @training.id,
          user_name:@user.name
        } }
      end.to change(Chat, :count).by(1)
    end

    it 'can not chat at not following trainings' do
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      expect do
        post '/chats', params: { chat: {
          content: 'test',
          training_id: @training.id
        } }
      end.to change(Chat, :count).by(0)
    end
  end

  describe 'DELETE /destroy' do
    it 'own chats should be deleted' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      expect do
        delete "/chats/#{@chat.id}"
      end.to change(Chat, :count).by(-1)
    end

    it 'not own chats should not be deleted' do
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      expect do
        delete "/chats/#{@chat.id}"
      end.to change(User, :count).by(0)
    end
  end
end
