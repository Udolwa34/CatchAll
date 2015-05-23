Rails.application.routes.draw do

  devise_for :trainers, :path => '', :path_names => {:sign_in => 'login', :sign_up => 'login'}, :controllers => {:registrations => 'registrations', :passwords => 'passwords'}
  resources :trainers
  resources :pokemons
  resources :badges
  resources :contacts, only: [:new, :create]
  

  #Root
  root 'pokemons#search'


  #Other routes
  get 'megabookedex' => 'megabookedex#index'
  
  get 'pokemons/getPokemonByPage/:page' => 'pokemons#getPokemonByPage'
  get 'pokemons/changeStateOfPokemon/:id' => 'pokemons#changeStateOfPokemon'
  get 'search' => 'pokemons#search'
  get 'api/search' => 'pokemons#apisearch'

  get 'badges/removeFromTrainer/:id' => 'badges#removeFromTrainer'
  get 'badges/addToTrainer/:id' => 'badges#addToTrainer'

  get 'contact_us' => 'contacts#new'
  #get 'contact_us/validation' => 'contacts#create'

  get 'ranking' => 'ranks#index'

  get 'account' => 'trainers#show'



  #Dev routes
  get 'rank/recalculate' => 'ranks#defineRanks'
  get 'dev/deltrainers' => 'megabookedex#deltrainers'
  
end
