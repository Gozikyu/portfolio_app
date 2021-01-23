require 'rails_helper'

RSpec.describe 'Users', type: :request do

  # # テストユーザーとしてログインする
  # def log_in_as(user)
  #   session[:user_id] = user.id
  # end

  describe 'GET /show' do
    it 'renders a successful response' do
      FactoryBot.create(:user)
      get users_url
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    it 'valid user should signup' do
      post '/users', params: { user: { email: '', password: '' } }
      expect(response).to have_http_status(200)
    end

    it 'invalid user should not signup' do
      expect do
        post '/users', params: { user: FactoryBot.attributes_for(:namelessUser) }
      end.to change(User, :count).by(0)
    end
  end

  describe 'PATCH /update' do
  # context 'with valid parameters' do
  #   let(:new_attributes) do
  #   { email: 'new_test@mail.com' }
  #   end

    it 'updates the requested user' do
      user = FactoryBot.create(:user)
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      patch user_url(user), params: { user: FactoryBot.attributes_for(:UpdatedUser)  }
      user.reload
      expect(user.email).to eq 'update@gmail.com'
    end

    # it 'redirects to the user' do
    # user = User.create! valid_attributes
    # patch user_url(user), params: { user: new_attributes }
    # user.reload
    # expect(response).to redirect_to(user_url(user))
    # end
  end

  

  # let(:valid_attributes) do
  #     { name: 'test', email: 'test@mail.com' }
  #   end

  # let(:invalid_attributes) do
  # { name: '', email: 'test@mail.com' }
  # end

  # describe 'GET /show' do
  # it 'renders a successful response' do
  #     user = User.create! valid_attributes
  #     get user_url(user)
  #     expect(response).to be_successful
  # end
  # end

  # describe 'GET /new' do
  # it 'renders a successful response' do
  #     get new_user_url
  #     expect(response).to be_successful
  # end
  # end


  # describe 'POST /create' do
  # context 'with valid parameters' do
  #     it 'creates a new User' do
  #     expect do
  #         post users_url, params: { user: valid_attributes }
  #     end.to change(User, :count).by(1)
  #     end

  #     it 'redirects to the created user' do
  #     post users_url, params: { user: valid_attributes }
  #     expect(response).to redirect_to(user_url(User.last))
  #     end
  # end

  # context 'with invalid parameters' do
  #     it 'does not create a new User' do
  #     expect do
  #         post users_url, params: { user: invalid_attributes }
  #     end.to change(User, :count).by(0)
  #     end

  #     it "renders a successful response (i.e. to display the 'new' template)" do
  #     post users_url, params: { user: invalid_attributes }
  #     expect(response).to be_successful
  #     end
  # end
  # end


  # context 'with invalid parameters' do
  #     it "renders a successful response (i.e. to display the 'edit' template)" do
  #     user = User.create! valid_attributes
  #     patch user_url(user), params: { user: invalid_attributes }
  #     expect(response).to be_successful
  #     end
  # end
  # end

  # describe 'DELETE /destroy' do
  # it 'destroys the requested user' do
  #     user = User.create! valid_attributes
  #     expect do
  #     delete user_url(user)
  #     end.to change(User, :count).by(-1)
  # end

  # it 'redirects to the users list' do
  #     user = User.create! valid_attributes
  #     delete user_url(user)
  #     expect(response).to redirect_to(users_url)
  # end
  # end
end
