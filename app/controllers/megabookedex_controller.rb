class MegabookedexController < ApplicationController

  # GET /megabookedex
  def index
    #@pokemons = Pokemon.all
    @badges = Badge.all
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
