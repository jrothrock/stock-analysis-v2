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

ActiveRecord::Schema.define(version: 20171106235530) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assets", force: :cascade do |t|
    t.integer "user_id"
    t.jsonb "data"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal "current", precision: 8, scale: 2, default: "0.0"
    t.decimal "total", precision: 8, scale: 2, default: "0.0"
    t.decimal "today", precision: 8, scale: 2, default: "0.0"
    t.decimal "yesterday", precision: 8, scale: 2, default: "0.0"
    t.decimal "beginning", precision: 8, scale: 2, default: "0.0"
    t.decimal "roi", precision: 8, scale: 2
  end

  create_table "ledger", force: :cascade do |t|
    t.string "ticker", null: false
    t.integer "user_id"
    t.boolean "purchase", default: false
    t.decimal "amount", precision: 8, scale: 2, default: "0.0"
    t.decimal "change", precision: 8, scale: 2, default: "0.0"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean "closed", default: false
    t.jsonb "data"
    t.boolean "withdrawl", default: false
    t.integer "quantity"
    t.text "the_great"
    t.text "the_good"
    t.text "the_bad"
    t.text "the_ugly"
    t.datetime "purchase_date"
    t.decimal "purchase_price", precision: 8, scale: 2, default: "0.0"
    t.datetime "sale_date"
    t.decimal "sale_price", precision: 8, scale: 2, default: "0.0"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "ticker", null: false
    t.integer "user_id"
    t.decimal "purchase", precision: 8, scale: 2, default: "0.0"
    t.decimal "sold", precision: 8, scale: 2, default: "0.0"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "sold_date"
    t.boolean "closed", default: false
    t.integer "quantity"
    t.integer "remaining"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.string "username"
    t.string "login_username"
    t.string "token_string"
    t.string "token"
    t.index ["login_username"], name: "index_users_on_login_username", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
