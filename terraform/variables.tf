variable "cloudflare_api_token" {
  type = string
  sensitive = true
}
variable "cloudflare_account_id" {
  type = string
  sensitive = true
}
variable "cloudflare_zone_id" {
  type = string
  sensitive = true
}
variable "cloudflare_hostname" {
  type = string
}
variable "cloudflare_subdomain" {
  type = string
}
variable "github_username" {
  type = string
}
