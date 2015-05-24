class Rank < ActiveRecord::Base
	belongs_to :trainer

	#Task called by "Whenever" Gem
	def defineRanks
		#Recalculate ranking stats for all trainers 
		Trainer.all.each do |trainer|
			#Gathering data
			@trainerPokemonCaughtCount = trainer.pokemons.where('huntstates.caught = 1').count
			@trainerPokemonSeenCount = trainer.pokemons.count
			@badgesCount = trainer.badges.count
			@points = @trainerPokemonCaughtCount * @trainerPokemonSeenCount * (@badgesCount + 1)

			#Build params for update OR create trainer's rank
			@paramsCreateUpdate = {
				:pokemon_viewed => @trainerPokemonSeenCount,
				:pokemon_caught => @trainerPokemonCaughtCount,
				:badges_count   => @badgesCount,
				:total_points   => @points 
			}

			#Create/Update trainer's rank
			if trainer.rank != nil
				trainer.rank.update(@paramsCreateUpdate)
			else 
				trainer.create_rank(@paramsCreateUpdate)
			end 
		end 
	end
end