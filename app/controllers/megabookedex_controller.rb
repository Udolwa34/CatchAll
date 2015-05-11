class MegabookedexController < ApplicationController

  # GET /megabookedex
  def index
    #@pokemons = Pokemon.all
    @badges = Badge.all
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
