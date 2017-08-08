require 'sinatra'
require 'sinatra/reloader'

get '/' do
  'root'
end

get '/path' do
  'path'
end

post "/upload" do
  'upload called!'
  logger.info "params: " + params.inspect
  # logger.info params
end
