class AddRankNumberToRanksTable < ActiveRecord::Migration
  def change
  	change_table :ranks do |t|
      t.integer :position
    end
  end
end
