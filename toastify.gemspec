lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "toastify/version"

Gem::Specification.new do |spec|
  spec.name          = "toastify"
  spec.version       = Toastify::VERSION
  spec.authors       = ["vasanthakumar-a"]
  spec.email         = ["vasanthakumara117@gmail.com"]

  spec.summary       = "Toast notifications for Rails."
  spec.description   = "A lightweight Rails gem providing a toast notification system. Compatible with Rails 4, 5, 6, 7+ and also integrates seamlessly with Turbo Stream requests."
  spec.homepage      = "https://github.com/vasanthakumar-a/toastify"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 1.9.3"

  spec.metadata = {
    "source_code_uri"   => "https://github.com/vasanthakumar-a/toastify",
    "changelog_uri"     => "https://github.com/vasanthakumar-a/toastify/blob/main/CHANGELOG.md",
    "bug_tracker_uri"   => "https://github.com/vasanthakumar-a/toastify/issues",
    "documentation_uri" => "https://github.com/vasanthakumar-a/toastify#readme"
  }

  spec.files = Dir.chdir(__dir__) do
    Dir[
      "lib/**/*",
      "README.md",
      "MIT-LICENSE"
    ]
  end

  spec.require_paths = ["lib"]

  spec.add_dependency "rails", ">= 3.2"
end
