class AddFaveShow1ToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fave_show_1, :string
  end
end
