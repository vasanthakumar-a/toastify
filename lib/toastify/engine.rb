module Toastify
  class Engine < ::Rails::Engine
    isolate_namespace Toastify

    initializer "toastify.helper" do
      ActiveSupport.on_load(:action_view) do
        include Toastify::ApplicationHelper
      end
    end

    initializer "toastify.controller" do
      ActiveSupport.on_load(:action_controller) do
        include Toastify::Controller
      end
    end
  end
end
