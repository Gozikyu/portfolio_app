class Training < ApplicationRecord
  belongs_to :user
  has_many :passive_relationships, class_name: 'TrainingRelationship',
                                   foreign_key: 'followingT_id'
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :chats

  validates(:date, presence: true)
  validates(:location, presence: true)
  validates(:partner, presence: true,
                      inclusion: { in: %w[male female both] })
  validates(:limit_number, presence: true)

  def followed_by?(user)
    followers.include?(user)
  end
end
