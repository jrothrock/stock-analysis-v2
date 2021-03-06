class Api::V1::Auth::SessionsController < ApplicationController
  def new
  end
  def create
		user = User.find_by_credentials(
			params[:username].downcase,params[:password]
		)
		if !user.nil?
            render json: {token: user.token, data:{
					username: user.username
				}}, status: :ok
                return
        else
            render json: {}, status: :not_found
		end
	end

	def destroy
		if request.headers["Authorization"]
			loggedOut = User.logout(request.headers["Authorization"].split(' ').last)
			
			if loggedOut
				render json: {}, status: :ok
			else
				# not sure what this response code should be. (bad request/unauthorized?)
				render json: {}, status: :unauthorized
			end
		else
			render json: {}, status: :bad_request
		end
	end
end
