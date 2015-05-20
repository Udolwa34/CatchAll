class AddLoginToTrainer < ActiveRecord::Migration
  def change          	
    change_table :trainers do |t|
      t.string :login, null: false, default: ""
    end

    add_index :trainers, :login, 	unique: true
  end
end