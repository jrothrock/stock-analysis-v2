class Api::V1::Auth::UsersController < ApplicationController
  def new
  end
  
	def create
		username = params[:username]

		user = User.new
		
		user.username = params[:username].strip()
		user.login_username = params[:username].downcase.strip()
		if params[:email]
			user.email = params[:email].capitalize
		end
		user.password = params[:password].strip()
        begin
            if user.save
                render json: {token: user.token, data:{
                        username: user.username, email: user.email
                    }}, status: :ok
            else
				if user.errors.key?(:email)
					render json:{email:true, message:"Email is invalid"}, status: :bad_request
				elsif user.errors.key?(:username)
					render json:{username:true, message:"non alphanumeric characters were used - (a-z,0-9,-,_ [case insensitive])"}, status: :bad_request
				else
					render json:{message:user.errors.full_messages}, status: :bad_request
				end
			end
        rescue ActiveRecord::RecordNotUnique => e
            puts e.message
            # if e.message == 'Validation failed: Email has already been taken'

            # end
            render json:{}, status: :conflict

        end
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
