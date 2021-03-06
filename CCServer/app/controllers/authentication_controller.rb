class AuthenticationController < ApplicationController
 # POST /auth/login
 def login
   @user = User.find_by_email(params[:email])
   if @user.authenticate(params[:password])
     token = encode(user_id: @user.id, email: @user.email, budget: @user.budget)
     render json: { token: token }, status: :ok
   else
     render json: @user.errors.to_a, status: :unauthorized
   end
 end
 
 private
 
 def login_params
   params.permit(:email, :password)
 end

end
