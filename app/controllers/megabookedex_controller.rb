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

end
