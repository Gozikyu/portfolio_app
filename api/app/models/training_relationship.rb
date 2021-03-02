class TrainingRelationship < ApplicationRecord
  belongs_to :follower, class_name: 'User'
  belongs_to :followingT, class_name: 'Training'
  validates :follower_id, presence: true
  validates :followingT_id, presence: true
end
