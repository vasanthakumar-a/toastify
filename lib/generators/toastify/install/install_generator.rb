require "rails/generators"

module Toastify
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      def copy_initializer
        copy_file "toastify.rb", "config/initializers/toastify.rb"
      end
    end
  end
end
