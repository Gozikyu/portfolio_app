require 'rails_helper'

RSpec.describe Training, type: :model do
  before do
    @user = FactoryBot.build(:user)
    @training = @user.trainings.new(
      menu: 'ベンチプレス',
      date: '2021-02-08',
      location: 'Gym1',
      partner: 'both',
      comment: 'comment'
    )
  end

  it 'should be vaild' do
    expect(@training).to be_valid
  end

  it 'date should be present' do
    @training.date = ''
    expect(@training).not_to be_valid
  end

  it 'location should be present' do
    @training.location = ''
    expect(@training).not_to be_valid
  end

  it 'partner should be present' do
    @training.partner = ''
    expect(@training).not_to be_valid
  end

  it 'valid partner should be accepted' do
    valid_partners = %w[male female both]
    valid_partners.each do |valid_partner|
      @training.partner = valid_partner
      expect(@training).to be_valid
    end
  end

  it 'invalid partner should not be accepted' do
    invalid_partners = %w[hoge foo mate]
    invalid_partners.each do |invalid_partner|
      @training.partner = invalid_partner
      expect(@training).not_to be_valid
    end
  end

  it 'limit_number should be present' do
    @training.limit_number = ''
    expect(@training).not_to be_valid
  end

  it 'comment length should be less than 140' do
    @training.comment = 'a'*51
    expect(@training).not_to be_valid
  end

end
