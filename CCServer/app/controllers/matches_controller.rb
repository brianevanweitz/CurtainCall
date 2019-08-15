class MatchesController < ApplicationController
  before_action :authorize_request, except: %i[index show]
  
  def index
    @user = User.find(params[:user_id])
    @matches = @user.matched_users
    @compare = []
    @matches.each do |item|
      matchback = item.matched_users
      @compare.push({ "user": item.name, "id": item.id, "matches": matchback})
    end
    render json: @compare
  end
  
  def show
    @user = User.find(params[:user_id])
    @match = @user.matched_users(:id)
    render json: @match
  end
  
  def create
    @user = User.find(params[:user_id])
    @matched_user=User.find(params[:matched_id])
    @check_matches = @matched_user.matched_users
    @user.matched_users << @matched_user
    render json: @check_matches
  end
  
  def destroy
    @user = User.find(params[:user_id])
    @matched_user=User.find(params[:id])
    @user.matched_users.destroy(@matched_user)
  end
  
 end
 