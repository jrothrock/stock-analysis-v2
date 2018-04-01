require 'jwt'
require 'bcrypt'
require 'securerandom'
class User < ApplicationRecord
  attr_reader :password
  include BCrypt

  validates_format_of :email, :with => /\A*.(?=.*\@\b)(?=.*\.\b).*\Z/, :on => :create
  validates_format_of :username, :with => /\A[\w-]*\Z/, :on => :create

  has_one :assets
  has_many :ledgers

  before_create :create_token

   def self.find_by_credentials(username, password)
    user = User.where("login_username = ?", username).first
    begin
      if user.password == password
        begin 
          user.create_token
          user.save!
        rescue 
          retry
        end
        return user
      end
    rescue
      return nil
    end
  end

  def self.find_by_token(token)
    begin
      if token && token != 'undefined'
        decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
        random_string = decoded_token[0]['string']
        user = User.where("token_string = ?", random_string).first
        return user
      end
      return false
    rescue => e
      logger.info "---BEGIN---"
      logger.info "Error in find by token"
      logger.info "Time: #{Time.now}"
      logger.debug e
      logger.info "---END---"
      return false
    end
  end

  def password
    @password ||= Password.new(encrypted_password)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.encrypted_password = @password
  end

  def self.setUUID
    begin 
      uuid = SecureRandom.hex(20)
      if(User.unscoped.where("uuid = ?", uuid).any?) then raise 'Go buy some lotto tickets, UUID has a duplicate!' end
      return uuid
      rescue
        retry
    end
  end

  def create_token
    begin
      random_string = SecureRandom.hex(20)
      if(User.unscoped.where("token_string = ?", random_string).any?) then raise "Go buy some lotto tickets, the token_string has a duplicate!" end
      rescue
        retry
    end
      self.token_string = random_string
      payload = {:string => self.token_string}
      token = JWT.encode payload, Rails.application.secrets.secret_key_base, 'HS256'
      self.token = token 
  end

  def self.logout(token)
    begin
    	decoded_token = JWT.decode token, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
      random_string = decoded_token[0]['string']
    	user = User.where("token_string = ?", random_string).first
    	if user.username
    		user.token = ''
        user.token_string = ''
    		user.save!
    		return true
    	end
    rescue 
    	return false
    end
  end
end
