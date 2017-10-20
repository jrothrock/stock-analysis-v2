class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.string "ticker", null:false
      t.references "users"
      t.decimal  "purchase", precision: 8, scale: 2, default: "0.0", null: false
      t.decimal  "sold", precision: 8, scale: 2, default: "0.0", null: false
      t.datetime "created_at",              null: false
      t.datetime "updated_at",              null: false
      t.datetime "sold_date",              null: false
    end

    add_column :users, :admin, :boolean, default:false
    add_column :users, :username, :string
  end
end
