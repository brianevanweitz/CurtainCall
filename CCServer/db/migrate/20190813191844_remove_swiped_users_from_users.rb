class RemoveSwipedUsersFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :swiped_users, :integer
  end
end
