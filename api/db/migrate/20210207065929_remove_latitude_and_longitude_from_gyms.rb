class RemoveLatitudeAndLongitudeFromGyms < ActiveRecord::Migration[6.1]
  def change
    remove_column :gyms, :latitude, :float
    remove_column :gyms, :longitude, :float
  end
end
