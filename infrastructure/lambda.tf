resource "aws_lambda_function" "backend" {
  function_name = "${var.project_name}-backend"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.backend.repository_url}:latest"
  timeout       = 60
  memory_size   = 1024

  environment {
    variables = {
      SPRING_MONGODB_URI    = var.mongo_uri
      JWT_SECRET            = var.jwt_secret
      AWS_S3_BUCKET         = aws_s3_bucket.images.bucket
      PORT                  = "8080"
      AWS_LWA_ASYNC_INIT    = "true"
      AWS_LWA_READINESS_CHECK_PATH = "/api/food/list"
    }
  }

  depends_on = [aws_iam_role_policy_attachment.lambda_basic]

  lifecycle {
    # Không để Terraform override image khi GitHub Actions deploy
    ignore_changes = [image_uri]
  }
}
