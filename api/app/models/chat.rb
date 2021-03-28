class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :training

  validates(:user_id, presence: true)
  validates(:training_id, presence: true)
  validates(:user_name, presence: true)
end
