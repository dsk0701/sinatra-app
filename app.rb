require 'sinatra'
require 'sinatra/reloader'
require 'json'


IMAGE_DIR = './public/images'

get '/' do
  @title = "Hello World!"
  erb :index
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
