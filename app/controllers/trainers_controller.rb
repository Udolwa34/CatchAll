class TrainersController < ApplicationController
#before_filter :authenticate_user!

  def show
    @trainer = current_trainer

    respond_to do |format|
        format.html # show.html.erb
        format.xml { render :xml => @user }
    end
  end

end