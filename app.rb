require 'sinatra'
require 'sinatra/reloader'
require 'json'

get '/' do
  'root'
end

get '/path' do
  'path'
end

post "/upload" do
  'upload called!'
  logger.info "params: " + params.inspect

  body = request.body.read
  logger.info "body: " + body.inspect
  body.to_json
end
