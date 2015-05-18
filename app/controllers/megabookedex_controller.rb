class MegabookedexController < ApplicationController
  # before_action :authenticate_trainer!

  # GET /megabookedex
  def index
    #@pokemons = Pokemon.all

    ####### Badges managing ######
    #Badges by Region
    @badges = Badge.all
    @badgesTotal = @badges.count
    @regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unys", "Kalos"]
    @badgesByRegion = [[], [], [], [], [], []]

    @badges.each do |badge|
      for n in (0..5) do
        if badge.region == @regions[n]
           @badgesByRegion[n].push badge
          break
        end
      end
    end 

    #Badges of trainer
    #if current_trainer? != nil <TODO> Vérifier que le trainer n'est pas NIL
    @trainerBadges = current_trainer.badges
  end

  # DELETE /trainers
  # DEV method only
  def deltrainers
  	@trainers = Trainer.all
  	@trainers.each do |trainer|
  		trainer.destroy
  	end
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Trainers were successfully destroyed.' }
      format.json { head :no_content }
    end
  end

end
