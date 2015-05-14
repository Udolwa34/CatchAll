class Badge < ActiveRecord::Base
	has_and_belongs_to_many :trainers, :join_table => 'trainers_badges'
end
