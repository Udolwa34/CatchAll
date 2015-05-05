class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.integer :number
      t.string :name
      t.string :picturelink
      t.string :region
      t.string :champion
      t.string :ville
      t.string :type

      t.timestamps null: false
    end
  end
end
