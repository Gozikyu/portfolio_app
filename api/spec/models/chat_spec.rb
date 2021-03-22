require 'rails_helper'

RSpec.describe Chat, type: :model do
  before do
    @chat = FactoryBot.create(:valid_chat)
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
end
