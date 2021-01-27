require 'rails_helper'

RSpec.describe 'Users', type: :request do
  before do
    @user = FactoryBot.create(:user)
    @another = FactoryBot.create(:Another)
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

    # it 'redirects to the user' do
    # user = User.create! valid_attributes
    # patch user_url(user), params: { user: new_attributes }
    # user.reload
    # expect(response).to redirect_to(user_url(user))
    # end
  end

  describe 'DELETE /destroy' do
    it 'admin user should destory users' do
      post '/login', params: { user: { email: 'hoge@gmail.com', password: 'password' } }
      expect do
        delete user_url(@another)
      end.to change(User, :count).by(-1)
    end

    it 'non_admin user should not destroys users' do
      post '/login', params: { user: { email: 'another.com', password: 'password' } }
      expect do
        delete user_url(@another)
      end.to change(User, :count).by(0)
    end
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

  # it 'redirects to the users list' do
  #     user = User.create! valid_attributes
  #     delete user_url(user)
  #     expect(response).to redirect_to(users_url)
  # end
  # end
end
