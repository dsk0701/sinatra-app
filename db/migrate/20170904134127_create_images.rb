class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :file
      t.string :comment
      t.timestamps  #=> この一行でcreated_atとupdated_atのカラムが定義される
    end
  end
end
