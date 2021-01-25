# frozen_string_literal: true

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

  # ログイン済みユーザーかどうか確認
  def logged_in_user
    unless logged_in?
      render json: { logged_in: false, message: current_user }
    end
  end

  def correct_user
    @user = User.find_by(id:params[:id])
    # render json: {status: 404, message: 'ログイン中のユーザー情報以外は編集できません'} unless User.find_by(id:session[:user_id]) == @user
    # unless (User.find_by(id:session[:user_id]) == @user) {
      render status: 404 unless User.find_by(id:session[:user_id]) == @user
  end
  
end
