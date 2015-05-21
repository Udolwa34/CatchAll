class BadgesController < ApplicationController
  before_action :set_badge, only: [:show, :edit, :update, :destroy, :removeFromTrainer, :addToTrainer]
  before_action :authenticate_trainer!

  #Removing a badge from a trainer's collection
  def removeFromTrainer
    if !@badge.trainers.exists?(current_trainer) 
      #Throw Error
      render nothing: true, :status => :forbidden
    else
      #Remove of badge
      @badge.trainers.delete(current_trainer)

      #Rendering with some data
      @badgesTotal = Badge.all.count
      @trainerBadges = current_trainer.badges.count
      render json: { :total => @badgesTotal, :trainerNbr => @trainerBadges }, status: :ok
    end 
  end

  #Adding a badge to a trainer's collection
  def addToTrainer
    if @badge.trainers.exists?(current_trainer) 
      #Throw Error
      render nothing: true, :status => :forbidden
    else
      #Add badge
      @badge.trainers<< current_trainer

      #Rendering with some data
      @badgesTotal = Badge.all.count
      @trainerBadges = current_trainer.badges.count
      render json: { :total => @badgesTotal, :trainerNbr => @trainerBadges }, status: :ok
    end 
  end

  # GET /badges
  # GET /badges.json
  def index
  end

  # GET /badges/1
  # GET /badges/1.json
  def show
  end

  # GET /badges/new
  def new
    @badge = Badge.new
  end

  # GET /badges/1/edit
  def edit
  end

  # POST /badges
  # POST /badges.json
  def create
    @badge = Badge.new(badge_params)

    respond_to do |format|
      if @badge.save
        format.html { redirect_to @badge, notice: 'Badge was successfully created.' }
        format.json { render :show, status: :created, location: @badge }
      else
        format.html { render :new }
        format.json { render json: @badge.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /badges/1
  # PATCH/PUT /badges/1.json
  def update
    if !@badge.trainers.exists?(current_trainer) 
      @badge.trainers<< current_trainer
    end

    respond_to do |format|
      if @badge.update(badge_params)
        format.html { redirect_to @badge, notice: 'Badge was successfully updated.' }
        format.json { render :show, status: :ok, location: @badge }
      else
        format.html { render :edit }
        format.json { render json: @badge.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /badges/1
  # DELETE /badges/1.json
  def destroy
    @badge.destroy
    respond_to do |format|
      format.html { redirect_to badges_url, notice: 'Badge was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_badge
      @badge = Badge.find(params[:id])
      return
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def badge_params
      params.require(:badge).permit(:number, :name, :picturelink, :region, :champion, :ville, :typebadge)
    end
end
