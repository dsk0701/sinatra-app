require 'sinatra'
require 'sinatra/reloader'
require 'json'
require './app/uploaders/image_uploader'
require './app/models/image'
# gemを一括require
require 'bundler'
Bundler.require


configure do
  # Sinatra::Application.environment に ENV['APP_ENV'] が設定されているので、
  # APP_ENV=production ruby app.rb
  # で環境を切り替えることができる。
  ActiveRecord::Base.configurations = YAML.load(ERB.new(File.read("db/database.yml")).result)
  # puts "ActiveRecord::Base.configurations: " + ActiveRecord::Base.configurations.inspect
  # puts "Sinatra::Application.environment: " + Sinatra::Application.environment.inspect
  ActiveRecord::Base.establish_connection(Sinatra::Application.environment)
end


get '/' do
  @title = "Hello World!"
  erb :index
end

get "/upload" do
  erb :upload
end

post "/new" do
  image = Image.new(file: params[:file], comment: "")
  if image.save
    response = {code: 200, messages: "成功しました"}
  else
    response = {code: 400, messages: image.errors.full_messages}
  end
  response.to_json
end

post "/upload" do
  logger.info "params: " + params.inspect

  file = params[:file]
  unless file
    return status 400
  end

  contentType = file[:type]
  # TODO: Check contentType.
  allowedContentTypes = %w(image/gif image/png image/jpeg)

  path = "./public/images/#{file[:filename]}"
  File.open(path, 'wb') do |f|
    p file[:tempfile]
    f.write file[:tempfile].read
  end

  "".to_json
end
