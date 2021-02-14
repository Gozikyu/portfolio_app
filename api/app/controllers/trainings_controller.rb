class TrainingsController < ApplicationController
  before_action :logged_in_user, only: %i[create destroy]
  before_action :correct_user, only: [:destroy]

  def show
    @user = User.find(params[:id])
    render json: @user.trainings
  end

  def create
    @training = current_user.trainings.create(training_params)
    render json: @training

    # @training = current_user.trainings.create(training_params)
    # if @training.save
    #   render json: @training
    # else
    #   render json: { status: 404, message: 'トレーニング登録失敗' }
    # end
  end

  # def update
  #     @user = User.find(params[:id])
  #     @user.update(registrations_params)
  #     render json: @user
  # end

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
end
