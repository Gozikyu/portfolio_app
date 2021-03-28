class AddNameToChats < ActiveRecord::Migration[6.1]
  def change
    add_column :chats, :user_name, :string
  end
end
