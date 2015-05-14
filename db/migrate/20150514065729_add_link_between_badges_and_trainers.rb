class AddLinkBetweenBadgesAndTrainers < ActiveRecord::Migration
  def change
  	create_table :trainers_badges, id: false do |t|
      t.belongs_to :trainer, index: true
      t.belongs_to :badge, index: true
    end
  end
end