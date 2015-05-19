class PokemonsController < ApplicationController
  before_action :set_pokemon, only: [:show, :edit, :update, :destroy, :changeStateOfPokemon]
  before_action :authenticate_trainer!


  def getPokemonByPage
    @page = params[:page]
    if @page == ""
      #Throw Error
      render nothing: true, :status => :forbidden
    else 
      #Rendering with some data 
      @pokemons = Pokemon.all.limit(18).offset(18*(@page.to_i-1)).order("number asc")
      @pokemonTrainer = current_trainer.pokemons.select('pokemons.*, huntstates.viewed, huntstates.caught').where(number: (18*(@page.to_i-1))..(18*@page.to_i))

      render json: { 
        :pokemons => @pokemons, 
        :pokemonTrainer => @pokemonTrainer
      }, status: :ok
    end
  end
  

  #TODO ! Limiter l'accès en JSON seulement
  #Changing state of a Pokemon from trainer's collection
  def changeStateOfPokemon
    @state = params[:state]
    if (@state != "Viewed" && @state != "Caught" && @state != "None")
      #Throw Error
      render nothing: true, :status => :forbidden
      return
    end

    if !@pokemon.trainers.exists?(current_trainer) 
      if @state == "None"
        #Throw Error
        render nothing: true, :status => :forbidden
        return
      else
        if @state == "Caught"
          @pokemon.huntstates.create(:trainer => current_trainer, :viewed => 1, :caught => 1)
        else
          @pokemon.huntstates.create(:trainer => current_trainer, :viewed => 1, :caught => 0)
        end
      end
    else
      if @state == "None"
        @pokemon.trainers.delete(current_trainer)
      else
        @hunt = @pokemon.huntstates.where(:trainer => current_trainer)
        @paramForUpdate = ""
        if @state == "Caught"
          @paramForUpdate = { :viewed => 1, :caught => 1}
        else
          @paramForUpdate = { :viewed => 1, :caught => 0}
        end
        if !@hunt.first.update(@paramForUpdate)
          #Throw Error
          render nothing: true, :status => :forbidden
        end
      end
    end 

    #Rendering with some data
    @pokemons = current_trainer.pokemons
      @ViewedNb = @pokemons.count
      @CaughtNb = @pokemons.where('huntstates.caught = 1').count

    render json: { :pkmn => @pokemons, :view => @ViewedNb, :caught => @CaughtNb }, status: :ok
  end


  # GET /api/search
  def apisearch
    @valueRecherche = params[:search].to_s
    @results = []
    if @valueRecherche != ""
      @results = Pokemon.where("name LIKE :name", {:name => "%"+@valueRecherche+"%"}).limit(10)
    end
    render :text => @results.to_json
  end


  # GET /search
  def search
    @maxPokemon = Pokemon.all.count
  end





  # GET /pokemons
  # GET /pokemons.json
  def index
    @pokemons = Pokemon.all
  end

  # GET /pokemons/1
  # GET /pokemons/1.json
  def show
  end

  # GET /pokemons/new
  def new
    @pokemon = Pokemon.new
  end

  # GET /pokemons/1/edit
  def edit
  end


  # POST /pokemons
  # POST /pokemons.json
  def create
    @pokemon = Pokemon.new(pokemon_params)

    respond_to do |format|
      if @pokemon.save
        format.html { redirect_to @pokemon, notice: 'Pokemon was successfully created.' }
        format.json { render :show, status: :created, location: @pokemon }
      else
        format.html { render :new }
        format.json { render json: @pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pokemons/1
  # PATCH/PUT /pokemons/1.json
  def update
    respond_to do |format|
      if @pokemon.update(pokemon_params)
        format.html { redirect_to @pokemon, notice: 'Pokemon was successfully updated.' }
        format.json { render :show, status: :ok, location: @pokemon }
      else
        format.html { render :edit }
        format.json { render json: @pokemon.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pokemons/1
  # DELETE /pokemons/1.json
  def destroy
    @pokemon.destroy
    respond_to do |format|
      format.html { redirect_to pokemons_url, notice: 'Pokemon was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pokemon
      @pokemon = Pokemon.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pokemon_params
      params.require(:pokemon).permit(:number, :name, :picturelink, :smallpicturelink)
    end
end
