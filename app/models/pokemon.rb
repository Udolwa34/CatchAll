class Pokemon < ActiveRecord::Base
	#Associations
	has_many :huntstates
	has_many :trainers, through: :huntstates
end
