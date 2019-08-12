class MatchesController < ApplicationController
  before_action :authorize_request, except: %i[index show]

  def index
    @user = User.find(params[:user_id])
    @matches = @user.matched_users
    render json: @matches
  end

  def show
    @user = User.find(params[:user_id])
    @match = @user.matched_users(:id)
    render json: @match
  end

  def create
    @user = User.find(params[:user_id])
    @matched_user=User.find(params[matched_id])
    @user.matched_users << @matched_user
    render json: @matched_user
  end

  def destroy
    
  end

end
