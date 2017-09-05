require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'bundler'
require './app/uploaders/image_uploader'
Bundler.require


IMAGE_DIR = './public/images'

configure do
    ActiveRecord::Base.configurations = YAML.load_file('db/database.yml')
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
  # uploader = ImageUploader.new
  uploader = Some.new
  logger.info "uploader: " + uploader.inspect
  logger.info "params: " + params.inspect
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

  path = "#{IMAGE_DIR}/#{file[:filename]}"
  File.open(path, 'wb') do |f|
    p file[:tempfile]
    f.write file[:tempfile].read
  end

  "".to_json
end
