class GymsController < ApplicationController
  def index
    @gym = Gym.all
    render json: @gym
  end

  def create
    @gym = Gym.create(registrations_params)
    render json: @gym
  end

  def destroy
    @gym = Gym.find(params[:id])
    if @gym.destroy
      render json: { status: 200, message: 'ジム削除成功' }
    else
      render json: { status: 404, message: 'ジム削除失敗' }
    end
  end

  def registrations_params
    params.require(:gym).permit(:name, :latitude, :longitude, :url)
  end
end
