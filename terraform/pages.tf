# Basic project
resource "cloudflare_pages_project" "frontend_project" {
  account_id        = var.cloudflare_account_id
  name              = "audiomark"
  production_branch = "main"
  
  build_config {
    build_command       = "./build.sh"
    destination_dir     = "dist"
    root_dir            = "/"
  }

  source {
    type = "github"
    config {
      owner                         = "glynnbird"
      repo_name                     = "audiomark"
      production_branch             = "main"
      # pr_comments_enabled           = true
      # deployments_enabled           = true
      # production_deployment_enabled = true
      # preview_deployment_setting    = "custom"
      # preview_branch_includes       = ["dev", "preview"]
      # preview_branch_excludes       = ["main", "prod"]
    }
  }
    deployment_configs {
      preview {
        
      }
      production {
        environment_variables = {
          NODE_VERSION = "18"
          API_KEY = random_string.apiKey.id
        }
      }
  }
}

resource "cloudflare_pages_domain" "frontend_domain" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.frontend_project.name
  domain       = "audiomark.glynnbird.com"
}

resource "cloudflare_record" "frontend_dns" {
  zone_id = var.cloudflare_zone_id
  name    = "audiomark"
  content   = cloudflare_pages_project.frontend_project.subdomain
  type    = "CNAME"
  ttl     = 3600
}
