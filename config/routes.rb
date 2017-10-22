Rails.application.routes.draw do
  root 'home#index'
  get '/', to: 'home#index'
  get '/signup', to: 'users#new', as: 'new_user'
  get '/signin', to: 'sessions#new', as:'new_session'
  get '/stock', to: 'stocks#new', as: 'new_stock'
  post '/stock', to: 'stocks#create', as:'create_stock'
  get '/stock/:stock', to: 'stocks#read', as:'get_stock'
  get '/stocks', to: 'stocks#index', as: 'get_stocks'
  get '/ledger', to: 'ledger#index', as: 'get_ledger'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do

    namespace :v1 do
      namespace :auth do
        post '/signup', to: 'users#create', as: 'add_user'
        post '/signin', to: 'sessions#create', as: 'signin'
        post '/signout', to: 'sessions#destroy', as: 'logout'
      end

      namespace :stocks do
        get '/', to:'stocks#index', as:'get_stocks'
        post '/', to: 'stocks#create', as:'create_stock'
        get '/sell', to:'sell#read', as: 'get_sellable_stocks'
        get '/:stock', to:'stocks#read', as:'get_stock_api'
        post '/purchase', to:'purchase#create', as:'purchase_stock'
        post '/sell', to: 'sell#create', as: 'sell_stock'
      end
    end
  end
end
