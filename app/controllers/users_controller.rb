class UsersController < ApplicationController
  def new
  end
  
	def create
		puts params[:username]
		puts params[:email]
		puts params[:password]
		username = params[:username]
		if (username =~ /^[\w-]*$/) != 0
			render json:{characters:true, message:"non alphanumeric characters were used - (a-z,0-9,-,_ [case insensitive])"}, status: :bad_request
			return false
		end

		user = User.new
		
		user.username = params[:username].strip()
		user.login_username = params[:username].downcase.strip()
		if params[:email]
			user.email = params[:email].capitalize
		end
		user.password = params[:password].strip()
		if user.save
			render json: {token: user.token, data:{
					username: user.username, email: user.email
				}}, status: :ok
		# elsif user.errors['login_username'].length > 0 && user.errors['email'].length === 0 && user.errors['token_string'].length === 0
		# 	Rails.logger.info(user.errors.inspect)
		# 	checkuser = User.where('login_username = ?', user.login_username).first
		# 	if checkuser && checkuser.locked
		# 		render json: {success:false, errors: 'locked'}
		# 	elsif !checkuser
		# 		render json:{status:false, errors:'username-length', message:"username length is too long. Maximum is 20 characters"}
		# 	else
		# 		render json: {success:false, errors: 'username', message:"username has already been taken"}
		# 	end
		# elsif user.errors['email'].length > 0 && user.errors['login_username'].length == 0 && user.errors['token_string'].length === 0
		# 	render json: {sucess:false, errors: 'email'}
		# elsif (user.errors['email'].length && user.errors['login_username'].length) > 0 && user.errors['token_string'].length === 0
		# 	render json: {success:false, errors:true, both:true}
		# else
		# 	render json: {sucess:false, errors: nil}
		end
	end
end
