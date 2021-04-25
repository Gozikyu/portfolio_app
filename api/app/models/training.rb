class Training < ApplicationRecord
  belongs_to :user
  has_many :passive_relationships, class_name: 'TrainingRelationship',
                                   foreign_key: 'followingT_id'
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :chats, dependent: :destroy

  validates(:date, presence: true)
  validates(:location, presence: true)
  validates(:partner, presence: true,
                      inclusion: { in: %w[male female both] })
  validates(:limit_number, presence: true)
  validates(:comment, length: { maximum: 50 })

  def followed_by?(user)
    followers.include?(user)
  end
end
