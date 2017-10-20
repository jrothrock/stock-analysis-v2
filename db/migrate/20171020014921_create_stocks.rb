class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.string "ticker", null:false
      t.integer "user_id"
      t.text "description"
      t.decimal  "purchase", precision: 8, scale: 2, default: "0.0"
      t.decimal  "sold", precision: 8, scale: 2, default: "0.0"
      t.datetime "created_at"            
      t.datetime "updated_at"            
      t.datetime "sold_date"            
    end

    add_index :stocks, :user_id
    add_column :users, :admin, :boolean, default:false
    add_column :users, :username, :string
    add_column :users, :login_username, :string
    add_column :users, :token_string, :string
    add_column :users, :token, :string
  end
end
