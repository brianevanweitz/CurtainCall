class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :fave_shows, array: true
      t.string :budget
      t.integer :swiped_users, array: true

      t.timestamps null: false
    end
  end
end
