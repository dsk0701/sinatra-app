require 'sinatra'
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
  files = Image.pluck(:file).sample(8)
  random_images = Image.where(file: files)
  @thumb_files = random_images.map {|image|
    image.file.thumb.url
  }
  @image_files = random_images.map {|image|
    image.file.url
  }
  logger.info @image_files
  erb :index
end

get "/upload" do
  erb :upload
end

not_found do
  erb :not_found
end

# API
post "/new" do
  image = Image.new(file: params[:file], comment: "")
  if image.save
    logger.info "Upload success"
    response = {code: 200, messages: "success"}
  else
    logger.error "Upload failed"
    status 400
    response = {code: 400, messages: image.errors.full_messages}
  end
  response.to_json
end

get '/images' do
  offset = params['offset'] or 0
  count = params['count'] or 20

  files = Image.pluck(:file)
  random_images = Image.where(file: files).limit(count).offset(offset)
  @image_files = random_images.map {|image|
    image.file
  }
  logger.info @image_files
  response = {
    images: @image_files,
  }
  response.to_json
end
