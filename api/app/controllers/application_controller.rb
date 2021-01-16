# frozen_string_literal: true

class ApplicationController < ActionController::API
    include ActionController::Cookies

    def login!
        session[:user_id] = @user.id
    end

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id])
        end
    end

end
