require 'rails_helper'

RSpec.describe 'Trainings', type: :request do
  before do
    @user = FactoryBot.create(:user)
    post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
    @training = @user.trainings.create(FactoryBot.attributes_for(:valid_training))
    @user.follow(@training)
  end

  describe 'GET /user_training' do
    it 'renders a successful response' do
      get "/trainings/#{@user.id}"
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    it 'should be registered with valid params' do
      expect do
        post '/trainings', params: { training: FactoryBot.attributes_for(:valid_training) }
      end.to change(@user.trainings, :count).by(1)
    end

    it 'should not be registered with invalid params' do
      expect do
        post '/trainings', params: { training: FactoryBot.attributes_for(:invalid_training) }
      end.to change(@user.trainings, :count).by(0)
    end
  end

  describe 'DELETE /destroy' do
    it 'login_user should delete own trainings' do
      expect do
        delete "/trainings/#{@training.id}"
      end.to change(@user.trainings, :count).by(-1)
    end

    it 'should not delete trainings of another' do
      @another = FactoryBot.create(:Another)
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      expect do
        delete "/trainings/#{@training.id}"
      end.to change(@user.trainings, :count).by(0)
    end
  end

  describe 'GET /get_followers' do
    it 'followers should be rendered' do
      get "/trainings/#{@training.id}/followers"
      expect(JSON.parse(response.body)[0]['name']).to match @user.name
    end
  end

end
