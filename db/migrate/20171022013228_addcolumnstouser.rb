class Addcolumnstouser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :roi, :decimal, precision: 8, scale: 2, default: 0.0
    remove_index :users, :email
    add_index :users, :username, unique:true
    add_index :users, :login_username, unique:true
    add_column :stocks, :data, :jsonb, default:'{}'

    create_table :ledger do |t|
      t.string "ticker", null:false
      t.integer "user_id"
      t.text "description"
      t.boolean  "purchase", default: false
      t.decimal  "amount", precision: 8, scale: 2, default: "0.0"
      t.decimal  "change", precision: 8, scale: 2, default: "0.0"
      t.datetime "created_at"            
      t.datetime "updated_at"  
      t.boolean "closed", default: false
      t.jsonb "data"                     
    end

    create_table :assets do |t|
      t.integer "user_id"
      t.jsonb "data"
      t.datetime "created_at"            
      t.datetime "updated_at"    
      t.decimal  "current", precision: 8, scale: 2, default: "0.0"
      t.decimal  "total", precision: 8, scale: 2, default: "0.0"
      t.decimal  "today", precision: 8, scale: 2, default: "0.0"
      t.decimal  "yesterday", precision: 8, scale: 2, default: "0.0"
    end

    drop_table :stocks
    remove_column :users, :roi
    add_column :assets, :beginning, :decimal, precision:8, scale:2, default: "0.0"
  end
end
