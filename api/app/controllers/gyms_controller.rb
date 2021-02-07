class GymsController < ApplicationController
  def index
    @gym = Gym.all
    render json: @gym
  end

  def create
    @gym = Gym.create(registrations_params)
    render json: @gym
  end

  def registrations_params
    params.require(:gym).permit(:name, :latitude, :longitude)
  end

end
