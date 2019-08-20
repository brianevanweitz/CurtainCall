class RemoveUniqueFromIndex < ActiveRecord::Migration[5.2]
  def remove
    remove_index :messages, [:user_id, :target_user_id], unique: true
  end
  def restore
    add_index :messages, [:user_id, :target_user_id]
  end
end
