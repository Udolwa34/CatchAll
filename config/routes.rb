Rails.application.routes.draw do

  get 'contact_us' => 'contacts#new'
  get 'ranking' => 'rankings#index'

  get 'account' => 'trainers#show'

  #get 'contact_us/validation' => 'contacts#create'

  devise_for :trainers, :path => '', :path_names => {:sign_in => 'login', :sign_up => 'login'}, :controllers => {:registrations => 'registrations', :passwords => 'passwords'}
  resources :pokemons
  resources :badges
  resources :contacts, only: [:new, :create]
  resources :trainers

  root 'pokemons#search'

  get 'megabookedex' => 'megabookedex#index'
  
  get 'pokemons/getPokemonByPage/:page' => 'pokemons#getPokemonByPage'
  get 'pokemons/changeStateOfPokemon/:id' => 'pokemons#changeStateOfPokemon'
  get 'badges/removeFromTrainer/:id' => 'badges#removeFromTrainer'
  get 'badges/addToTrainer/:id' => 'badges#addToTrainer'

  get 'search' => 'pokemons#search'
  get 'api/search' => 'pokemons#apisearch'

  get 'dev/deltrainers' => 'megabookedex#deltrainers'
  

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
