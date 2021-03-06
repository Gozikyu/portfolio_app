class SessionsController < ApplicationController
  before_action :logged_in_user, only: [:new]
  # def login
  #   @user = User.find_by(email: session_params[:email])

  #   if @user && @user.authenticate(session_params[:password])
  #       login!
  #       render json: { logged_in: true, user: @user }
  #   else
  #       render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
  #   end
  # end

  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  def new
    if current_user
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

  def create
    @user = User.find_by(email: signin_params[:email])
    if @user && @user.authenticate(signin_params[:password])
      session[:user_id] = @user.id
      render json: { user_id: session[:user_id], user: current_user }
    else
      render status: 404
    end
  end

  def destroy
    log_out
  end
end

private

def signin_params
  params.require(:user).permit(:email, :password)
end
