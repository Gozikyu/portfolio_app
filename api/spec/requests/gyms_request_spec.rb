require 'rails_helper'

RSpec.describe "Gyms", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/gyms/index"
      expect(response).to have_http_status(:success)
    end
  end

end
