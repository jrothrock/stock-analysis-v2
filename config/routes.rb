Rails.application.routes.draw do
  root 'home#index'
  get '/', to: 'home#index'
  get '/signup', to: 'users#new', as: 'new_user'
  post '/signup', to: 'users#create', as: 'add_user'
  get '/signin', to: 'sessions#new', as:'new_session'
  post '/signin', to: 'sessions#create', as: 'signin'
  post '/logout', to: 'sessions#destroy', as: 'logout'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
