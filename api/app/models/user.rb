# frozen_string_literal: true

class User < ApplicationRecord
  has_many :trainings, dependent: :destroy
  has_many :active_relationships, class_name: 'TrainingRelationship',
                                  foreign_key: 'follower_id',
                                  dependent: :destroy
  has_many :followingTs, through: :active_relationships
  has_many :chats, dependent: :destroy

  before_save { self.email = email.downcase }
  validates(:name, presence: true, length: { maximum: 50 })
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze
  validates(:email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true)
  validates(:gender, presence: true, format: { with: /male/ || /female/ })
  has_secure_password
  validates(:password, presence: true, length: { minimum: 6 }, allow_nil: true)

  def follow(training)
    active_relationships.create(follower_id: id, followingT_id: training.id)
  end

  def unfollow(training)
    active_relationships.find_by(followingT_id: training.id).destroy
  end

  def following?(training)
    followingTs.include?(training)
  end
end
