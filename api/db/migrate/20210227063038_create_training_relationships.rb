class CreateTrainingRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :training_relationships do |t|
      t.integer :training_id
      t.integer :follower_id

      t.timestamps
    end
    add_index :training_relationships, :training_id
    add_index :training_relationships, :follower_id
    add_index :training_relationships, [:training_id, :follower_id], unique: true
  end
end
