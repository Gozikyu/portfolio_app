class ApplicationController < ActionController::API
  include ActionController::Cookies

  def login!
    session[:user_id] = @user.id
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !current_user.nil?
  end

  def logged_in_user
    render json: { logged_in: false, message: current_user } unless logged_in?
  end

  def correct_user
    @user = User.find_by(id: params[:id])
    render status: 404 unless User.find_by(id: session[:user_id]) == @user
  end

  def admin_user
    render json: { status: 500, message: '現在のユーザーはadminユーザーではありません。' } unless current_user.admin
  end

  def test
    render json: { message: 'test' }
  end
end
