require 'rails_helper'

RSpec.describe Gym, type: :model do
  before do
    @gym = FactoryBot.build(:gym)
  end

  it 'should be vaild' do
    expect(@gym).to be_valid
  end

  it 'name should be present' do
    @gym.name = ''
    expect(@gym).not_to be_valid
  end

  it 'latitude should be present' do
    @gym.latitude = ''
    expect(@gym).not_to be_valid
  end

  it 'latitude should be greater than -90' do
    @gym.latitude = -90
    expect(@gym).not_to be_valid
  end

  it 'latitude should be greater than 90' do
    @gym.latitude = 90
    expect(@gym).not_to be_valid
  end

  it 'longitude should be present' do
    @gym.longitude = ''
    expect(@gym).not_to be_valid
  end

  it 'longitude should be greater than -180' do
    @gym.longitude = -180
    expect(@gym).not_to be_valid
  end

  it 'longitude should be greater than 180' do
    @gym.longitude = 180
    expect(@gym).not_to be_valid
  end
end
