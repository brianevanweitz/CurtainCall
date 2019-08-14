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

ActiveRecord::Schema.define(version: 2019_08_13_192539) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "matches", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "matched_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["matched_user_id"], name: "index_matches_on_matched_user_id"
    t.index ["user_id", "matched_user_id"], name: "index_matches_on_user_id_and_matched_user_id", unique: true
    t.index ["user_id"], name: "index_matches_on_user_id"
  end

  create_table "swipes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "swipe_id"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_swipes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.string "budget"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_pic"
    t.string "fave_show_1"
    t.string "fave_show_2"
    t.string "fave_show_3"
  end

  add_foreign_key "matches", "users"
  add_foreign_key "matches", "users", column: "matched_user_id"
  add_foreign_key "swipes", "users"
end
