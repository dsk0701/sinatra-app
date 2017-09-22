require 'carrierwave'
require 'carrierwave/orm/activerecord'


class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file
  permissions 0666

  # リサイズ. 小さければ何もしない.
  process resize_to_limit: [800, 800]

  # サムネイル用にくり抜き.
  version :thumb do
    process resize_to_fill: [200,200]
  end

  def store_dir
    'images'
  end

  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def content_type_whitelist
    /image\//
  end

  def filename
    "#{secure_token(10)}.#{file.extension}" if original_filename.present?
  end

  protected
  def secure_token(length=16)
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.hex(length/2))
  end

end
