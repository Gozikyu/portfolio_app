require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
require 'action_cable/engine'
# require "sprockets/railtie"
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Myapp
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://3.112.0.252:3000'
        resource '*',
                 headers: :any,
                 methods: %i[get post patch delete options],
                 credentials: true
      end
    end

    # config.hosts << '.example.com'
    config.hosts << '3.112.0.252'

    # セッションメソッドを有効にする
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::ContentSecurityPolicy::Middleware
    # ログイン状態を保持する為に署名つきCookieへの保存を有効にする
    # cookies.permanent.signed[:user_id] = user.id
    # cookies.permanent[:remember_token] = user.remember_token

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local

    config.action_dispatch.default_headers = {
      'Access-Control-Allow-Credentials' => 'true',
      'Access-Control-Allow-Origin' => 'http://3.112.0.252:3000',
      'Access-Control-Request-Method' => '*'
    }
  end
end
