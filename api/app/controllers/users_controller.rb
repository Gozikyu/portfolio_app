class UsersController < ApplicationController
  before_action :logged_in_user, only: %i[index update]
  before_action :correct_user, only: [:update]
  before_action :admin_user, only: [:destroy]

  def index
    @user = User.all
    render json: @user
  end

  def show
    @user = User.find(params[:id])
    render json: @user.followingTs
  end

  def create
    @user = User.create(registrations_params)
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(registrations_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: { status: 200, message: 'ユーザー削除成功' }
    else
      render json: { status: 404, message: 'ユーザー削除失敗' }
    end
  end

  def follow_training
    @user = User.find(params[:user_id])
    @training = Training.find(params[:training_id])
    if (@user.name != current_user.name) && (@training.limit_number > @training.followers.length)
      @user.follow(@training)
    else
      render json: { status: 404, message: '参加人数上限に達しています' } 
    end
  end

  def unfollow_training
    @user = User.find(params[:user_id])
    @training = Training.find(params[:training_id])
    @user.unfollow(@training)
  end

  def followed_training?
    @user = User.find(params[:user_id])
    @training = Training.find(params[:training_id])
    if @user.following?(@training)
      render json: { followed: true }
    else
      render json: { followed: false }
    end
  end

  private

  def registrations_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
