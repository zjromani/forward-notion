variable "s3_bucket" {
  description = "The name of the S3 bucket containing the Lambda function code."
  default     = "forward-notion"
}

variable "s3_key" {
  description = "The S3 key of the Lambda function code."
  default     = "app.zip"
}
