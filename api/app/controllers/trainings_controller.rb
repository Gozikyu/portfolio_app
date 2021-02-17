require "time"

class TrainingsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: [:destroy]

  def index
    @training=Training.all
    render json: @training.where(menu:'ベンチプレス')
  end

  def show
    @training = User.find(params[:id])
    render json: @training.trainings
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
    #Viewのformで取得したパラメータをモデルに渡す
    @training=Training.all
    render json:@training.where("date LIKE ?", '%'+ date_format(params[:search][:date])+"%").where("location LIKE ?",params[:search][:location]).where("partner LIKE ?",params[:search][:partner]).where("menu LIKE ?","%" + params[:search][:menu].to_s + "%")
  end

  def destroy
    if @training.destroy
      render json: { status: 200, message: 'トレーニング予定削除成功' }
    else
      render json: { status: 404, message: 'トレーニング予定削除失敗' }
    end
  end

  private

  def training_params
    params.require(:training).permit(:menu, :date, :location, :partner)
  end

  def correct_user
    @training = current_user.trainings.find_by(id: params[:id])
  end

  def date_format(date)
    training_date=Time.parse(date).in_time_zone('Tokyo').strftime('%Y-%m-%d')
    return training_date
  end
end
