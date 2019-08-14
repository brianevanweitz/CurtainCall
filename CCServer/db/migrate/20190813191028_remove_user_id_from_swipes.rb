class RemoveUserIdFromSwipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :swipes, :user_id, :integer
  end
end
