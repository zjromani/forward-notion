variable "s3_bucket" {
  description = "The name of the S3 bucket containing the Lambda function code."
  default     = "forward-notion"
}

variable "s3_key" {
  description = "The S3 key of the Lambda function code."
  default     = "app.zip"
}

variable "GMAIL_PASSWORD" {
  description = "The password for the Gmail account"
  type        = string
}

variable "GMAIL_USER" {
  description = "The username for the Gmail account"
  type        = string
}

variable NOTION_DATABASE_ID {
  description = "The ID of the Notion database"
  type        = string
}

variable "NOTION_API_KEY" {
  description = "API key for accessing Notion"
  type        = string
}
