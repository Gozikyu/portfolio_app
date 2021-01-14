class SessionsController < ApplicationController
  def new
    @user = User.all
    render json: @user
  end

  def create
    @user = User.find_by(email: signin_params[:email])
    if @user && @user.authenticate(signin_params[:password])
      session[:user_id] = @user.id
      render json: User.find(session[:user_id])
    else
      render status:404
    end
  end
end

private

def signin_params
  params.require(:user).permit(:email, :password)
end

def log_in(user)
  session[:user_id] = user.id
end

def current_user
  if session[:user_id]
    @current_user ||= User.find_by(id: session[:user_id])
  end
end

def logged_in?
  !current_user.nil?
end