class ChatsController < ApplicationController
    before_action :correct_user, only: [:destroy]

    def index
        @chat = Chat.all
        render json: @chat
    end
        
    def create
        @training = Training.find(params[:chat][:training_id])
        if current_user.following?(@training)
            @chat = current_user.chats.create!(chat_params)
            render json: @chat
        else 
            render json: { status: 520, message: 'フォローしているトレーニング内でしかチャットできません' }
        end
    end
    
    def destroy
        if @chat && @chat.destroy
            render json: { status: 200, message: 'トレーニング予定削除成功' }
        else
            render json: { status: 500, message: 'トレーニング予定削除失敗' }
        end
    end

    private

    def chat_params
      params.require(:chat).permit(:content, :training_id)
    end
  
    def correct_user
        @chat = Chat.find(params[:id])
        render status: 500 unless current_user.id == @chat.user_id
    end
end
