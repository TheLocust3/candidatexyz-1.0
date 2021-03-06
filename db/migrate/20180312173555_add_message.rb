class AddMessage < ActiveRecord::Migration[5.1]
  def change
    create_table :messages, id: :uuid, default: "uuid_generate_v4()" do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :subject
      t.text :message

      t.timestamps
    end
  end
end
