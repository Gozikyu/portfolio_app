require 'rails_helper'

RSpec.describe "Gyms", type: :request do

  before do
    @gym = FactoryBot.create(:gym)
end

describe 'GET /index' do
    it 'renders a successful response' do
      get '/gyms'
      expect(response).to be_successful
    end
end 

describe 'POST /create' do
  it 'should be registered with valid params' do
    expect do
      post '/gyms', params: { gym: FactoryBot.attributes_for(:valid_gym) }
    end.to change(Gym, :count).by(1)
  end

  it 'should not be registered with invalid params' do
      expect do
        post '/gyms', params: { gym: FactoryBot.attributes_for(:invalid_gym) }
      end.to change(Gym, :count).by(0)
    end
end

describe 'DELETE /destroy' do
  it 'should be deleted gyms' do

    expect do
      delete '/gyms/'+@gym.id.to_s
    end.to change(Gym, :count).by(-1)
  end
end


# describe 'DELETE /destroy' do
#   it 'login_user should delete own trainings' do
#     expect do
#       delete '/gyms/'+@gym.id.to_s
#     end.to change(@user.trainings, :count).by(-1)
#   end
# end



end
