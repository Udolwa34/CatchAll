class MegabookedexController < ApplicationController

  # GET /megabookedex
  def index
    #@pokemons = Pokemon.all
    @badges = Badge.all
  end

end
