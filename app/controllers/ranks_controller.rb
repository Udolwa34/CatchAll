class RanksController < ApplicationController

	def index
		#@ranksAll = Rank.all
		#@test = @ranksAll.joins(:trainer).select('ranks.*, trainers.email').limit(50).order("total_points desc")
		#render :json => { :ranks => @test}
		#return


		# Pokemon
        @pokemonMax = Pokemon.all.count

        # Badge
        @badgeMax = Badge.all.count

        # Medals
        @medals = ["gold", "silver", "bronze"]

  		# Trainer
		@trainersAll = Trainer.all
		@trainerMax = @trainersAll.count
		@trainerPseudo = current_trainer.email
		@trainers = @trainersAll.limit(50).order("id asc")

		@ranksAll = Rank.all
		@ranks = @ranksAll.joins(:trainer).select('ranks.*, trainers.login').limit(1).order("total_points desc")
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

	def getRankByPage
	    @page = params[:page]
	    if @page == ""
	      #Throw Error
	      render nothing: true, :status => :forbidden
	    else 
	      #Rendering with some data 
		  @ranks = Rank.all.joins(:trainer).select('ranks.*, trainers.login').limit(1).offset(@page).order("total_points desc");

	      render json: { 
	        :ranks => @ranks
	      }, status: :ok
	    end
	end


end
