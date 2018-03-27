create_table :pipelines do |t|
  add_reference :user

  add_column :name, :string
  add_column :hour, :string
end

create_table :aws_configs do |t|
  add_reference :user

  add_column :aws_access_key, :string
  add_column :aws_secret_access_key, :string
  add_column :aws_account_id, :string
  add_column :aws_arn_role_name, :string
end

create_table :endpoints do |t|
  add_reference :pipeline

  add_column :params, :json
end

create_table :connectors do |t|
  add_reference :source, foreign_key: { to_table: :endpoints }
  add_reference :target, foreign_key: { to_table: :endpoints }
  add_reference :pipeline
end
