class GymsController < ApplicationController
  def index
    @gym = Gym.all
    render json: @gym

  end
end
