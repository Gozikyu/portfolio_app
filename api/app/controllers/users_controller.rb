class UsersController < ApplicationController
  # before_action :logged_in_user, only: [:index, :update]
  before_action :admin_user, only: [:update, :destroy]
  before_action :correct_user, only: [:update]
  # before_action :admin_user, only: [:destroy]
  
  def index
    @user = User.all
    render json: @user
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.create(registrations_params)
    render json: @user
  end

  def update
    @user = User.find(registrations_params)
    @user.update(registrations_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: { status: 200, message: 'ユーザー削除成功' }
    else
      render json:{ status: 404, message: 'ユーザー削除失敗' }
    end
  end

  private

  def registrations_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end


end
