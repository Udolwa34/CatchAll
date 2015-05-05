class ChangeTypeOfBadgeWithTypebadge < ActiveRecord::Migration
  def change
  	change_table :badges do |t|
	  t.rename :type, :typebadge
	end
  end
end
