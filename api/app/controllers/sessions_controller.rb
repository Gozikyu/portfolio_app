class SessionsController < ApplicationController
  def new
    @user = User.all
    render json: @user
  end

  def create
    @user = User.find_by(email: signin_params[:email])
    if @user && @user.authenticate(signin_params[:password])
      render json: @user
    else
      render status:404
    end
  end
end

private

def signin_params
  params.require(:user).permit(:email, :password)
end