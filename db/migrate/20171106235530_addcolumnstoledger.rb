class Addcolumnstoledger < ActiveRecord::Migration[5.1]
  def change
    remove_column :ledger, :description, :text
    add_column :ledger, :the_great, :text
    add_column :ledger, :the_good, :text
    add_column :ledger, :the_bad, :text
    add_column :ledger, :the_ugly, :text

    add_column :ledger, :purchase_date, :datetime
    add_column :ledger, :purchase_price, :decimal, precision: 8, scale: 2, default: 0.0
    add_column :ledger, :sale_date, :datetime
    add_column :ledger, :sale_price, :decimal, precision: 8, scale: 2, default: 0.0
  end
end
