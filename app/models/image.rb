class Image < ApplicationRecord
  validates :identifier, presence: true, uniqueness: true
end