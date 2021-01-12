# frozen_string_literal: true

class UsersController < ApplicationController
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

  # def update
  #   @user = User.find(params[:id])
  #   @user.update_attributes(user: params[:user])
  #   render json: @user
  # end

  # def destroy
  #   @user = User.find(params[:id])
  #   if @user.destroy
  #     head :no_content, status: :ok
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  private

  def registrations_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
