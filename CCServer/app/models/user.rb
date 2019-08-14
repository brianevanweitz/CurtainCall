class User < ApplicationRecord
 has_secure_password
 validates :email, presence: true, uniqueness: true
 validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
 validates :password, length: { minimum: 6 }, allow_nil: true
 has_many :matches
 has_many :matched_users, through: :matches
 has_many :swipes

end
