json.array!(@badges) do |badge|
  json.extract! badge, :id, :number, :name, :picturelink, :region, :champion, :ville, :type
  json.url badge_url(badge, format: :json)
end
