class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorize_request, except: :create
  def index
    @users = User.all
    render json: @users
  end
  
  def show
    render json: @user, include: :swipes
  end
  
  def create
    @user = User.new(user_params)
  
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def update
    if @user.update(user_params)
      render json: "Your profile has been updated!"
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user.destroy
  
    head 204
  end
  
  private
    def set_user
      @user = User.find(params[:id])
    end
  
    def user_params
      params.require(:user).permit(:name, :email, :password, :fave_show_1, :fave_show_2, :fave_show_3, :budget, :profile_pic)
    end
  
 end
 