require 'rails_helper'

RSpec.describe TrainingRelationship, type: :model do
  before do
    @user = FactoryBot.create(:user)
    @another=FactoryBot.create(:Another)
    @training = @user.trainings.create(
      menu: 'ベンチプレス',
      date: '2021-02-08',
      location: 'Gym1',
      partner: 'both'
    )
    @relationship =Relationship.create(training_id: @user)
  end

  it "should be valid" do
    expect(@relationship).to be_valid
  end

  it "should require a follower_id" do
    @relationship.follower_id = nil
    expect(@relationship).not_to be_valid
  end

  it "should require a followed_id" do
    @relationship.training_id = nil
    expect(@relationship).not_to be_valid
  end
end