class SwipesController < ApplicationController
  def index
    @user = User.find(params[:user_id])
    @swipes = Swipe.where(user_id: @user.id)
    render json: @swipes
  end

  def create
    @user = User.find(params[:user_id])
    swipe_data = {
      user_id: params[:user_id],
      swipe_id: swipe_params[:swipe_id]
    }
    @swipe = Swipe.new(swipe_data)
    if @swipe.save
      render json: @swipe, status: :created
    else
      render json: @swipe.errors, status: :unprocessable_entity
    end
  end

  private
  def swipe_params
    params.require(:swipe).permit(:swipe_id)
  end
end