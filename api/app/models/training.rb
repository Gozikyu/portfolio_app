class Training < ApplicationRecord
  belongs_to :user

  has_many :passive_relationships, class_name: 'TrainingRelationship',
                                   foreign_key: 'followingT_id'

  has_many :followers, through: :passive_relationships, source: :follower

  validates(:date, presence: true)
  validates(:location, presence: true)
  validates(:partner, presence: true,
                      inclusion: { in: %w[male female both] })

  def followed_by?(user)
    followers.include?(user)
  end
end
