class Image < ActiveRecord::Base
  mount_uploader :file, ImageUploader
  validates :file, presence: true
end
