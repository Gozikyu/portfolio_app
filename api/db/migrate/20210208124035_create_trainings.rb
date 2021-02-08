class CreateTrainings < ActiveRecord::Migration[6.1]
  def change
    create_table :trainings do |t|
      t.string :menu
      t.datetime :date
      t.string :location
      t.string :partner

      t.timestamps
    end
  end
end
