Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  get '/users/:user_id/messages/target/:target_user_id', to: 'messages#conversation'
 resources :users do
   resources :matches
   resources :swipes
   resources :messages
 end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
