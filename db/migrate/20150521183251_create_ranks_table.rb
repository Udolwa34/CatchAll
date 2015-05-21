class CreateRanksTable < ActiveRecord::Migration
  def change
    create_table :ranks do |t|
  		t.belongs_to :trainer, index: true
  		t.integer :pokemon_viewed
  		t.integer :pokemon_caught
  		t.integer :badges_count
  		t.integer :total_points
    end
  end
end