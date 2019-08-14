class AddFaveShow2ToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fave_show_2, :string
  end
end
