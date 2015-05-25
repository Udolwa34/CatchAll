desc "Heroku scheduler tasks"
task :recalculate_trainers_ranks => :environment do
  puts "Recalculate rank for all trainers."
  Rank.defineRanks
  puts "Done !"
end