class AddSuperuserToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :superuser, :boolean, default: false
  end
end
