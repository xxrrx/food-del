variable "aws_region" {
  default = "us-east-1"
}

variable "project_name" {
  default = "food-delivery"
}

variable "domain_name" {
  default = "thuans.online"
}

variable "frontend_domain" {
  default = "thuans.online"
}

variable "admin_domain" {
  default = "admin.thuans.online"
}

variable "api_domain" {
  default = "api.thuans.online"
}

variable "mongo_uri" {
  description = "MongoDB Atlas connection string"
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  sensitive   = true
}
