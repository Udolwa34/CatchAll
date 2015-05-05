json.array!(@badges) do |badge|
  json.extract! badge, :id, :number, :name, :picturelink, :region, :champion, :ville, :typebadge
  json.url badge_url(badge, format: :json)
end
