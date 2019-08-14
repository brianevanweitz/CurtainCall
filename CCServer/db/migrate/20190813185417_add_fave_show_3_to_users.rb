class AddFaveShow3ToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fave_show_3, :string
  end
end
