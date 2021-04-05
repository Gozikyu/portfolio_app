# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

<<<<<<< HEAD
 Rails.application.config.middleware.insert_before 0, Rack::Cors do
   allow do
     origins 'http://52.195.8.187:3000', 'http://52.195.8.187:3001'

     resource '*',
       headers: :any,
       methods: [:get, :post, :put, :patch, :delete, :options, :head],
       credentials: true
   end
 end
=======
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://3.112.0.252:3000', 'http://localhost:3000'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
>>>>>>> 48a5881d3d94ffa875f585ccb27da2e9b8d81c44
