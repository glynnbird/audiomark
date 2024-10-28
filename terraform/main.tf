terraform {
  backend "s3" {
    bucket = "grb-terraform-state"
    key    = "audiomark/terraform.tfstate"
    region = "eu-west-1"
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.42.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# API key needed to access the API
resource "random_string" "apiKey" {
  length           = 20
  special          = false
  upper            = false
  lower            = true
}
output apiKey {
  value = random_string.apiKey.id
}
