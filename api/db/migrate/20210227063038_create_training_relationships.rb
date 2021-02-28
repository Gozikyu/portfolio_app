class CreateTrainingRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :training_relationships do |t|
      t.integer :followingT_id
      t.integer :follower_id

      t.timestamps
    end
    add_index :training_relationships, :followingT_id
    add_index :training_relationships, :follower_id
    add_index :training_relationships, [:followingT_id, :follower_id], unique: true
  end
end
