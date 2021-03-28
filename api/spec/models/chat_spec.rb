require 'rails_helper'

RSpec.describe Chat, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @training = @user.trainings.create(
      menu: 'ベンチプレス',
      date: '2021-02-08',
      location: 'Gym1',
      partner: 'both'
    )
    @chat = FactoryBot.create(:valid_chat, user_id: @user.id, training_id: @training.id,user_name:@user.name)
  end

  it 'should be vaild' do
    expect(@chat).to be_valid
  end

  it 'user_id should be present' do
    @chat.user_id = ''
    expect(@chat).not_to be_valid
  end

  it 'training_id should be present' do
    @chat.training_id = ''
    expect(@chat).not_to be_valid
  end

  it 'user_name should be present' do
    @chat.user_name = ''
    expect(@chat).not_to be_valid
  end

end
