class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :content
      t.references :user, index: true, foreign_key: true
      t.references :target_user, index: true

      t.timestamps
    end
    add_index :messages, [:user_id, :target_user_id], unique: true
    add_foreign_key :messages, :users, column: :target_user_id
  end
end
