class RanksController < ApplicationController

	def index
		# Pokemon
		@pokemonsAll = Pokemon.all
        @pokemonMax = @pokemonsAll.count

        # Badge
        @badgesAll = Badge.all
        @badgeMax = @badgesAll.count

  		# Trainer
		@trainersAll = Trainer.all
		@trainerMax = @trainersAll.count
		@trainerPseudo = current_trainer.email
		@trainers = @trainersAll.limit(50).order("id asc")

		@ranksAll = Rank.all
		@ranks = @ranksAll.limit(50).order("total_points desc")
		@trainerRank = current_trainer.rank


	end

	#Dev route
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
		render json: { :total => Rank.all }, status: :ok
	end


end
