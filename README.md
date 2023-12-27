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

**Status:** Under Construction 🚧

### Terraform

Before deploying with Terraform, set the required environment variables by running:

This will load the variables from your `.env` file and set them for the current shell session, making them available for Terraform commands.

```bash
./scripts/set-env.sh
```

To deploy the infrastructure, run:

1. `npm run build``
1. `npm run zip`
1. `npm run upload`
1. `npm run deploy`

```bash


### Usage

**Status:** Under Construction 🚧
```
