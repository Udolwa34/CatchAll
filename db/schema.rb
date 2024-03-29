# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150524192246) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "badges", force: :cascade do |t|
    t.integer  "number"
    t.string   "name"
    t.string   "picturelink"
    t.string   "region"
    t.string   "champion"
    t.string   "ville"
    t.string   "typebadge"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "huntstates", force: :cascade do |t|
    t.integer "pokemon_id"
    t.integer "trainer_id"
    t.integer "viewed"
    t.integer "caught"
  end

  add_index "huntstates", ["pokemon_id"], name: "index_huntstates_on_pokemon_id", using: :btree
  add_index "huntstates", ["trainer_id"], name: "index_huntstates_on_trainer_id", using: :btree

  create_table "pokemons", force: :cascade do |t|
    t.integer  "number"
    t.string   "name"
    t.string   "picturelink"
    t.string   "smallpicturelink"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "ranks", force: :cascade do |t|
    t.integer "trainer_id"
    t.integer "pokemon_viewed"
    t.integer "pokemon_caught"
    t.integer "badges_count"
    t.integer "total_points"
    t.integer "position"
  end

  add_index "ranks", ["trainer_id"], name: "index_ranks_on_trainer_id", using: :btree

  create_table "trainers", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "login",                  default: "", null: false
  end

  add_index "trainers", ["confirmation_token"], name: "index_trainers_on_confirmation_token", unique: true, using: :btree
  add_index "trainers", ["email"], name: "index_trainers_on_email", unique: true, using: :btree
  add_index "trainers", ["login"], name: "index_trainers_on_login", unique: true, using: :btree
  add_index "trainers", ["reset_password_token"], name: "index_trainers_on_reset_password_token", unique: true, using: :btree

  create_table "trainers_badges", id: false, force: :cascade do |t|
    t.integer "trainer_id"
    t.integer "badge_id"
  end

  add_index "trainers_badges", ["badge_id"], name: "index_trainers_badges_on_badge_id", using: :btree
  add_index "trainers_badges", ["trainer_id"], name: "index_trainers_badges_on_trainer_id", using: :btree

end
