class AddCommentToTrainings < ActiveRecord::Migration[6.1]
  def change
    add_column :trainings, :comment, :string
  end
end
