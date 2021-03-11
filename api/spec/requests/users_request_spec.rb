require 'rails_helper'

RSpec.describe 'Users', type: :request do
  before do
    @user = FactoryBot.create(:user)
    @another = FactoryBot.create(:Another)
    @another2 = FactoryBot.create(:Another2)
    @training = @user.trainings.create(
      menu: 'ベンチプレス',
      date: '2021-02-08',
      location: 'Gym1',
      partner: 'both',
      limit_number: 1
    )
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      get users_url
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    it 'valid user should signup' do
      expect do
        post '/users', params: { user: FactoryBot.attributes_for(:SignupUser) }
      end.to change(User, :count).by(1)
    end

    it 'invalid user should not signup' do
      expect do
        post '/users', params: { user: FactoryBot.attributes_for(:NamelessUser) }
      end.to change(User, :count).by(0)
    end

    it 'signup user should not be admin user' do
      post '/users', params: { user: FactoryBot.attributes_for(:SignupUser) }
      @signuped_user = User.last
      expect(@signuped_user.name).to eq 'Signup'
      expect(@signuped_user.admin).to eq false
    end
  end

  describe 'PATCH /update' do
    it 'updates the requested user' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      patch user_url(@user), params: { user: FactoryBot.attributes_for(:UpdatedUser) }
      @user.reload
      expect(@user.email).to eq 'update@gmail.com'
    end

    it 'should be rejected when edit as wrong user' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      patch user_path(@another), params: { user: { name: 'update' } }
      expect(response).to have_http_status(404)
      patch user_path(@user), params: { user: { name: 'update' } }
      @user.reload
      expect(response).to have_http_status(200)
      expect(@user.name).to eq 'update'
    end

    it 'should not allow the admin attribute to be edited via the web' do
      expect(@another.admin).to eq false
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      patch user_path(@another), params: { user: { admine: true } }
      expect(@another.admin).to eq false
    end
  end

  describe 'DELETE /destroy' do
    it 'admin user should destory users' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      expect do
        delete user_url(@another)
      end.to change(User, :count).by(-1)
    end

    it 'non_admin user should not destroys users' do
      post '/login', params: { user: { email: 'another@gmail.com', password: 'password' } }
      expect do
        delete user_url(@another)
      end.to change(User, :count).by(0)
    end
  end

  describe 'POST /follow_training' do
    it 'follow training successfully' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      expect do
        post "/users/#{@another.id}/trainings/#{@training.id}"
      end.to change(@training.followers, :count).by(1)
    end

    it 'follow should be canceled when followers have reached limit_number' do
      post "/users/#{@another.id}/trainings/#{@training.id}"
      expect do
        post "/users/#{@another2.id}/trainings/#{@training.id}"
      end.to change(@training.followers, :count).by(0)
    end

    it 'training owner should not follower own training' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      expect do
        post "/users/#{@user.id}/trainings/#{@training.id}"
      end.to change(@training.followers, :count).by(0)
    end
  end

  describe 'GET /followed_training?' do
    it 'check not followed training' do
      get "/users/#{@user.id}/trainings/#{@training.id}"
      expect(JSON.parse(response.body)['followed']).to eq false
    end

    it 'check followed training' do
      @user.follow(@training)
      get "/users/#{@user.id}/trainings/#{@training.id}"
      expect(JSON.parse(response.body)['followed']).to eq true
    end
  end

  describe 'DELETE /unfollow_training' do
    it 'unfollow training successfully' do
      @user.follow(@training)
      expect do
        delete "/users/#{@user.id}/trainings/#{@training.id}"
      end.to change(@user.followingTs, :count).by(-1)
    end
  end
end
