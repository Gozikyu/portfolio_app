class Training < ApplicationRecord
  belongs_to :user
  
  validates(:date, presence: true)
  validates(:location, presence: true)
  validates(:partner, presence: true,
                      inclusion: { in: %w[male female both] })
end
