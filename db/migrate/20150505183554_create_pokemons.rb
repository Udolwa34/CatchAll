class CreatePokemons < ActiveRecord::Migration
  def change
    create_table :pokemons do |t|
      t.integer :number
      t.string :name
      t.string :picturelink
      t.string :smallpicturelink

      t.timestamps null: false
    end
  end
end
