resource "aws_lambda_function" "backend" {
  function_name = "${var.project_name}-backend"
  role          = aws_iam_role.lambda.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.backend.repository_url}:latest"
  timeout       = 30
  memory_size   = 512

  environment {
    variables = {
      SPRING_MONGODB_URI = var.mongo_uri
      JWT_SECRET         = var.jwt_secret
      AWS_S3_BUCKET      = aws_s3_bucket.images.bucket
      PORT               = "8080"
    }
  }

  depends_on = [aws_iam_role_policy_attachment.lambda_basic]

  lifecycle {
    # Không để Terraform override image khi GitHub Actions deploy
    ignore_changes = [image_uri]
  }
}
