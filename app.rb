require 'sinatra'
require 'sinatra/reloader'

get '/' do
  'root'
end

get '/path' do
  'path'
end
