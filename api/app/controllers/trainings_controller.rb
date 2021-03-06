require 'time'

class TrainingsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: [:destroy]

  def index
    @training = Training.all
    render json: @training.where(menu: 'ベンチプレス')
  end

  def show
    @training = Training.find(params[:id])
    render json: @training
  end

  def user_training
    @user = User.find(params[:id])
    render json: @user.trainings
  end

  def create
    @training = current_user.trainings.create(training_params)
    render json: @training
  end

  # def update
  #     @user = User.find(params[:id])
  #     @user.update(registrations_params)
  #     render json: @user
  # end

  def search
    @training = Training.all
    render json: @training.where('(date LIKE ?) AND
                                  (location LIKE ?) AND
                                  (partner LIKE ?) AND
                                  (menu LIKE ?) AND
                                  (limit_number LIKE ?)',
                                 "%#{date_format(params[:search][:date])}%",
                                 "%#{params[:search][:location]}%",
                                 "%#{params[:search][:partner]}%",
                                 "%#{params[:search][:menu]}%",
                                 "%#{params[:search][:limit_number]}%")
  end

  def destroy
    if @training && @training.destroy
      render json: { status: 200, message: 'トレーニング予定削除成功' }
    else
      render json: { status: 404, message: 'トレーニング予定削除失敗' }
    end
  end

  def getting_followers
    @training = Training.find(params[:id])
    render json: @training.followers
  end

  private

  def training_params
    params.require(:training).permit(:menu, :date, :location, :partner, :limit_number, :comment)
  end

  # def correct_user
  #   @training = current_user.trainings.find_by(id: params[:id])
  # end

  def correct_user
    @training = Training.find(params[:id])
    render status: 404 unless current_user.id == @training.user_id
  end

  def date_format(date)
    if date
      Time.parse(date).in_time_zone('Tokyo').strftime('%Y-%m-%d')
    else
      date
    end
  end
end
