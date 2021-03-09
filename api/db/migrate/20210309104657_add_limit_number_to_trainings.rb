class AddLimitNumberToTrainings < ActiveRecord::Migration[6.1]
  def change
    add_column :trainings, :limit_number, :integer, default: 1
  end
end
