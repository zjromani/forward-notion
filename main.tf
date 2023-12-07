provider "aws" {
  region = "us-east-1"
	profile = "personal"
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
      },
    ],
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:*",
          "s3:GetObject",
        ],
        Effect = "Allow",
        Resource = "*",
      },
    ],
  })
}

resource "aws_lambda_function" "forward_notion" {
  function_name = "forwardNotion"
  runtime       = "nodejs20.x"
  handler       = "dist/index.js"

  s3_bucket = var.s3_bucket
  s3_key    = var.s3_key

  role = aws_iam_role.lambda_role.arn
}

resource "aws_cloudwatch_event_rule" "schedule_rule" {
  name        = "every_five_hours"
  description = "Trigger every five hours"
  schedule_expression = "cron(0 */5 * * ? *)"
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule = aws_cloudwatch_event_rule.schedule_rule.name
  target_id = "lambdaTarget"
  arn       = aws_lambda_function.forward_notion.arn
}

resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.forward_notion.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.schedule_rule.arn
}
