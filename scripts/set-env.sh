#!/bin/bash
# Load environment variables from a .env file and export them for Terraform

# Navigate to the project root directory where the .env file is located
cd "$(dirname "$0")/.."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Error: .env file not found. Create an .env file in the project root directory with the required environment variables."
  exit 1
fi

# Load and export the environment variables
set -a # automatically export all variables
source .env
set +a

# The script ends here. The calling npm script will handle the rest.
