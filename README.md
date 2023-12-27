# Forward to Notion

**Status:** Under Construction 🚧

## Description

This project is an email-to-Notion integration service designed to forward emails to a Notion database. It fetches emails, processes their content, and then programmatically adds them as entries to a specified Notion database. This service is particularly useful for organizing emails, archiving important messages, or integrating email content into a Notion-based workflow.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn
- Notion account and API access

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/forward-email-to-notion.git
   ```

2. Navigate to the project directory:

   ```bash
   cd forward-email-to-notion
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables by creating a `.env` file with the following content (update values accordingly):

   ```bash
   NOTION_API_KEY=<your_notion_api_key>
   GMAIL_USER=<your_email>
   GMAIL_PASSWORD=<your_email_password>
   ```

## Deployment

The deployment process involves building the application, creating a deployment package, uploading it to AWS S3, and then using Terraform to deploy the Lambda function.

1. **Build and Deploy:**

   - The `deploy` script in `package.json` has been configured to automate the build, package, upload, and deployment process. To deploy your Lambda function, simply run:

     ```bash
     npm run deploy
     ```

   This command performs the following actions:

   - Compiles the TypeScript files into JavaScript (using the TypeScript Compiler).
   - Creates a zipped deployment package with a unique timestamp.
   - Uploads the deployment package to the specified AWS S3 bucket.
   - Applies the Terraform configuration to update the AWS Lambda function with the new deployment package.

1. **Deployment Script Details:**

   The `deploy.sh` script included in the project root does the following:

   - Sets a version stamp based on the current date and time.
   - Builds the application and zips the output with the version stamp.
   - Cleans up old zip files in the project directory.
   - Uploads the new zip file to S3.
   - Runs Terraform apply with the new zip file as a variable.

### Notes

- Ensure that your AWS and Terraform configurations are up to date and correct.
- The script assumes that your AWS credentials and Terraform settings are already configured.
- The deployment process is configured for a specific AWS profile and S3 bucket. Update these settings in the scripts if necessary.

### Usage

**Status:** Under Construction 🚧

```

```
