class AddLinkBetweenPokemonAndTrainers < ActiveRecord::Migration
  def change
  	create_table :huntstates do |t|
  		t.belongs_to :pokemon, index: true
  		t.belongs_to :trainer, index: true
  		t.integer :viewed
  		t.integer :caught
  	end
  end
end
