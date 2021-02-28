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
    @relationship =TrainingRelationship.create(followingT_id: @training.id, follower_id: @user.id)
  end

  it "should be valid" do
    expect(@relationship).to be_valid
  end

  it "should require a follower_id" do
    @relationship.follower_id = nil
    expect(@relationship).not_to be_valid
  end

  it "should require a followed_id" do
    @relationship.followingT_id = nil
    expect(@relationship).not_to be_valid
  end

  it "should follow and unfollow a training" do
    expect(@another.following?(@training)).to eq false
    @another.follow(@training)
    expect(@another.following?(@training)).to eq true
    expect(@training.followed_by?(@another)).to eq true
    @another.unfollow(@training)
    expect(@another.following?(@training)).to eq false
  end
end