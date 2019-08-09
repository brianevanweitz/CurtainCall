# Curtain Call
#### To install:
* Fork and clone this repo
#### What is Curtain Call?
Curtain call is a tinder-style connection app that helps people find companions to go see live theater in New York City.
#### What will the app do?
* Users will be able to create and edit a profile with their name, desired shows, and budget.
* Users will be able to register or log in and perform authenticated actions via bcrypt-hashed passwords and json web token.
* Users will be able to view other users' profiles on cards and "swipe right" to add them as a match.
* Users who add each other as matches will be able to post messages to each other to coordinate plans to see shows together.
#### Technologies used:
* Rails API backend
  * bcrypt
  * json web token
* React Front End
  * React-router
  * Axios
  * React-spring(For swiping)
* Deployment
  * Heroku
  * Surge

#### MVP:
A full-stack app where users can create, edit, and delete profiles, and create and delete matches by viewing other users.

#### Post-MVP:
* A "Conversation" table that allows users to post messages to each other once they've both added one another as matches.
* Employing react-spring to add a "swiping" animation as user cards are liked or declined.
* Allowing users to upload images for their profiles.
* Far-stretch goal: employing action cable to make messages appear instantly.

#### Code Snippet from database test: Schema and models
```ActiveRecord::Schema.define(version: 2019_08_09_194947) do

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

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "matches", "users"
  add_foreign_key "matches", "users", column: "matched_user_id"
end

class Match < ApplicationRecord
  belongs_to :user
  belongs_to :matched_user, class_name: "User"
end

class User < ApplicationRecord
  has_many :matches
  has_many :matched_users, through: :matches
end
```

#### Expected challenges:
* Creating proper database and controllers for self-referential users table joined by matches, and adding conversations.

* Using mobile-first design strategies for styling.

* Storing matches correctly and efficiently on front end.


