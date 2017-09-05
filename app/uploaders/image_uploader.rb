require 'carrierwave'
require 'carrierwave/orm/activerecord'


class ImageUploader < CarrierWave::Uploader::Base
  storage :file
end

class Some
  def print
    puts "Some World!"
  end
end
