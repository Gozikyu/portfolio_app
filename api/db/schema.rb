# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_15_122132) do

  create_table "chats", charset: "utf8", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "training_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_name"
    t.index ["training_id"], name: "index_chats_on_training_id"
    t.index ["user_id", "created_at"], name: "index_chats_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_chats_on_user_id"
  end

  create_table "gyms", charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "latitude", precision: 17, scale: 14
    t.decimal "longitude", precision: 17, scale: 14
    t.string "url"
  end

  create_table "training_relationships", charset: "utf8", force: :cascade do |t|
    t.integer "followingT_id"
    t.integer "follower_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["follower_id"], name: "index_training_relationships_on_follower_id"
    t.index ["followingT_id", "follower_id"], name: "index_training_relationships_on_followingT_id_and_follower_id", unique: true
    t.index ["followingT_id"], name: "index_training_relationships_on_followingT_id"
  end

  create_table "trainings", charset: "utf8", force: :cascade do |t|
    t.string "menu"
    t.datetime "date"
    t.string "location"
    t.string "partner"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "limit_number", default: 1
    t.string "comment"
    t.index ["user_id"], name: "index_trainings_on_user_id"
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.boolean "admin", default: false
    t.string "gender"
  end

  add_foreign_key "chats", "trainings"
  add_foreign_key "chats", "users"
  add_foreign_key "trainings", "users"
end
