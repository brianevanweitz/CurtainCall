class AddSwipeIdToSwipes < ActiveRecord::Migration[5.2]
  def change
    add_column :swipes, :swipe_id, :integer
  end
end
