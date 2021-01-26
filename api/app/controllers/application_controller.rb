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
    unless logged_in?
      render json: { logged_in: false, message: current_user }
    end
  end

  def correct_user
    @user = User.find_by(id:params[:id])
    unless User.find_by(id:session[:user_id]) == @user
      render status: 404 
    end
  end

  def admin_user
    unless current_user.admin
      render json: { status: 500, message: "現在のユーザーはadminユーザーではありません。"}
    end
  end
  
end
