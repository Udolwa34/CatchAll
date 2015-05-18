class Pokemon < ActiveRecord::Base
	#Associations
	has_many :hunstates
	has_many :trainers, through: :huntstates
end
