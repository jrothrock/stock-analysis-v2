class Addcolumntoassets < ActiveRecord::Migration[5.1]
  def change
    add_column :ledger, :withdrawl, :boolean, default:false
    add_column :ledger, :quantity, :integer
    create_table :stocks do |t|
      t.string "ticker", null:false
      t.integer "user_id"
      t.decimal  "purchase", precision: 8, scale: 2, default: "0.0"
      t.decimal  "sold", precision: 8, scale: 2, default: "0.0"
      t.datetime "created_at"            
      t.datetime "updated_at"            
      t.datetime "sold_date" 
      t.boolean "closed", default:false
      t.integer "quantity"
      t.integer "remaining"           
    end
    add_column :assets, :roi, :decimal, precision:8, scale:2
  end
end
