class AddLatitudeAndLongitudeToGyms < ActiveRecord::Migration[6.1]
  def change
    add_column :gyms, :latitude, :decimal, precision: 17, scale: 14
    add_column :gyms, :longitude, :decimal, precision: 17, scale: 14
  end
end
