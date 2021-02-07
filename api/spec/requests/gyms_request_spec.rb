require 'rails_helper'

RSpec.describe "Gyms", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/gyms"
      expect(response).to have_http_status(200)
    end
  end

end
