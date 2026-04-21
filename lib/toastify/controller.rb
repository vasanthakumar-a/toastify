module Toastify
  module Controller
    extend ActiveSupport::Concern

    included do
      after_action :append_toastify_to_response
    end

    private

    def append_toastify_to_response
      return unless request.format.turbo_stream? || turbo_frame_request?

      toast_flashes = flash.reject { |type, _| type.to_s.start_with?("toast_") }
      return unless toast_flashes.any?

      script_content = helpers.toastify_script_tag
      return if script_content.blank?

      if request.format.turbo_stream?
        payload = turbo_stream.append("flash-outlet", script_content).to_s

        if response.body.is_a?(String)
          response.body += payload
        else
          response.body = response.body.to_s + payload
        end
      else
        body = response.body.to_s
        frame_closing_tag = "</turbo-frame>"

        if body.include?(frame_closing_tag)
          response.body = body.sub(frame_closing_tag, "#{script_content}#{frame_closing_tag}")
        else
          response.body = body + script_content.to_s
        end
      end
    end
  end
end
