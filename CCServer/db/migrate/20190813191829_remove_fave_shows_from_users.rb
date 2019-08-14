class RemoveFaveShowsFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :fave_shows, :string
  end
end
