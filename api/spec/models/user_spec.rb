require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @training = @user.trainings.create(
      menu: 'ベンチプレス',
      date: '2021-02-08',
      location: 'Gym1',
      partner: 'both'
    )
  end

  it 'should be vaild' do
    expect(@user).to be_valid
  end

  it 'name should be present' do
    @user.name = ''
    expect(@user).not_to be_valid
  end

  it 'name should be not be too long' do
    @user.name = 'a' * 51
    expect(@user).not_to be_valid
  end

  it 'email should be present' do
    @user.email = ''
    expect(@user).not_to be_valid
  end

  it 'email should be not be too long' do
    @user.email = "#{'a' * 244}@example.com"
    expect(@user).not_to be_valid
  end

  it 'email validation should accept valid addresses' do
    valid_addresses = %w[user@example.com
                         USER@foo.COM
                         A_US-ER@foo.bar.org
                         first.last@foo.jp
                         alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      @user.email = valid_address
      expect(@user).to be_valid
    end
  end

  it 'email validation should reject invalid addresses' do
    invalid_addresses = %w[user@example,com
                           user_at_foo.org
                           user.name@example.
                           foo@bar_baz.com
                           foo@bar+baz.com
                           foo@bar..com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      expect(@user).not_to be_valid
    end
  end

  it 'email addresses should be unique' do
    @duplicate_user = @user.dup
    @user.save
    expect(@duplicate_user).not_to be_valid
  end

  it 'email addresses should be saved as lower-case' do
    mixed_case_email = 'HogE@GmaiL.coM'
    @user.email = mixed_case_email
    @user.save
    expect(@user.reload.email).to eq mixed_case_email.downcase
  end

  it 'associated trainings should be destroyed' do
    expect do
      @user.destroy
    end.to change(Training, :count).by(-1)
  end

  it 'gender should be present' do
    @user.gender = ''
    expect(@user).not_to be_valid
  end

  it 'gender should be male or female' do
    @user.gender = 'hoge'
    expect(@user).not_to be_valid
  end

  it 'associated chats should be destroyed' do
    @chat = @user.chats.create!(
      content: 'test',
      training_id: @training.id,
      user_name: @user.name
    )
    expect do
      @user.destroy
    end.to change(Chat, :count).by(-1)
  end
end
