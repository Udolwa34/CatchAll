json.array!(@pokemons) do |pokemon|
  json.extract! pokemon, :id, :number, :name, :picturelink, :smallpicturelink
  json.url pokemon_url(pokemon, format: :json)
end
