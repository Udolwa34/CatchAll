class Huntstate < ActiveRecord::Base
	#Associations
	belongs_to :trainer
	belongs_to :pokemon
end