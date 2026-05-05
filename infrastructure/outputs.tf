output "frontend_url" {
  description = "URL website frontend"
  value       = "https://thuans.online"
}

output "admin_url" {
  description = "URL website admin"
  value       = "https://admin.thuans.online"
}

output "api_gateway_url" {
  description = "API URL - dùng làm VITE_API_URL trong GitHub Secrets"
  value       = "https://api.thuans.online"
}

output "ecr_repository_url" {
  description = "ECR URL - dùng trong GitHub Actions"
  value       = aws_ecr_repository.backend.repository_url
}

output "images_bucket_name" {
  description = "S3 bucket name cho ảnh"
  value       = aws_s3_bucket.images.bucket
}

output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}

output "admin_bucket_name" {
  value = aws_s3_bucket.admin.bucket
}

output "cloudfront_frontend_id" {
  value = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_admin_id" {
  value = aws_cloudfront_distribution.admin.id
}

output "github_actions_access_key_id" {
  description = "Thêm vào GitHub Secrets: AWS_ACCESS_KEY_ID"
  value       = aws_iam_access_key.github_actions.id
}

output "github_actions_secret_access_key" {
  description = "Thêm vào GitHub Secrets: AWS_SECRET_ACCESS_KEY"
  value       = aws_iam_access_key.github_actions.secret
  sensitive   = true
}
