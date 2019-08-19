class MessagesController < ApplicationController
  before_action :authorize_request

  def conversation
    @user = User.find(params[:user_id])
    @target_user = User.find(params[:target_user_id])
    @user_messages = Message.where(user_id: @user.id, target_user_id: @target_user.id)
    @target_messages = Message.where(user_id: @target_user.id, target_user_id: @user.id)
    render json: { user_messages: @user_messages, target_messages: @target_messages }
  end

  def create
    @user = User.find(params[:user_id])
    @target_user = User.find(params[:target_user_id])
    @message = Message.new(message_params)
    if @message.save
      render json: @message, status: :created
    else
      render json: @message.errors.to_a, status: :unprocessable_entity
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id, :target_user_id)
  end
end