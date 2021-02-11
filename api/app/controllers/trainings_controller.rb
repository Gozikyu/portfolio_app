class TrainingsController < ApplicationController
    before_action :logged_in_user, only: [:create, :destroy]
    before_action :correct_user, only: [:destroy]
  
    def show
        @user = User.find(params[:id])
        render json: @user.trainings
    end 

    def create
        @training = current_user.trainings.build(training_params)
        if @training.save
            render json: @training
          else
            render json: { status: 404, message: 'トレーニング登録失敗' }
        end
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

    private
    def training_params
        params.require(:training).permit(:meni, :date, :location, :partner)
    end
    
end
