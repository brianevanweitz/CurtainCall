class RemoveAttemptTwo < ActiveRecord::Migration[5.2]
  def change
    remove_index :messages, [:user_id, :target_user_id]
    add_index :messages, [:user_id, :target_user_id]
  end
end
