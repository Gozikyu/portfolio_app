class AddUrltoGyms < ActiveRecord::Migration[6.1]
  def change
    add_column :gyms, :url, :string
  end
end
