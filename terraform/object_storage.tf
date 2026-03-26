resource "cloudflare_r2_bucket" "audio_bucket" {
  account_id = var.cloudflare_account_id
  name = "audiomark-storage"
}

resource "cloudflare_r2_bucket_lifecycle" "example_r2_bucket_lifecycle" {
  account_id = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.audio_bucket.name
  rules = [{
    id = "Expire all objects older than 24 hours"
    conditions = {
      prefix = ""
    }
    enabled = true
    delete_objects_transition = {
      condition = {
        max_age = 30
        type = "Age"
      }
    }
  }]
}

resource "cloudflare_r2_bucket_cors" "audio_bucket_cors" {
  account_id = var.cloudflare_account_id
  bucket_name = cloudflare_r2_bucket.audio_bucket.name
  rules = [{
    allowed = {
      methods = ["GET","PUT"]
      origins = ["http://localhost:3000"]
      headers = ["x-requested-by","Content-Type"]
    }
    id = "Allow Local Development"
    expose_headers = ["Content-Encoding","Content-Type","ETag"]
    max_age_seconds = 3600
  },
  {
    allowed = {
      methods = ["GET","PUT"]
      origins = ["https://${var.cloudflare_subdomain}.${var.cloudflare_hostname}"]
      headers = ["x-requested-by","Content-Type"]
    }
    id = "Allow Prod"
    expose_headers = ["Content-Encoding","Content-Type","ETag"]
    max_age_seconds = 3600
  }]
}
