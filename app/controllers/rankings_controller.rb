class RankingsController < ApplicationController

	def index

		# Pokemon
		@pokemonsAll = Pokemon.all
        @pokemonMax = @pokemonsAll.count
        @trainerPokemonCaughtCount = (current_trainer.pokemons).where('huntstates.caught = 1').count
        @trainerPokemonSeenCount = (current_trainer.pokemons).count

        # Badge
        @badgesAll = Badge.all
        @badgeMax = @badgesAll.count
  		@trainerBadgesCount = (current_trainer.badges).count

  		# Trainer
		@trainersAll = Trainer.all
		@trainerMax = @trainersAll.count
		@trainerPseudo = current_trainer.email
		@trainers = @trainersAll.limit(50).order("id asc")



	end

end