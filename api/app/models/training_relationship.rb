class TrainingRelationship < ApplicationRecord
    belongs_to :follower, class_name: "User"
    belongs_to :training, class_name: "Training"
    validates :follower_id, presence: true
    validates :training_id, presence: true
end
