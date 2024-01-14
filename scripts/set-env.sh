#!/bin/bash
# Script to convert .env file to variables.tfvars for Terraform

ENV_FILE=".env"
TFVARS_FILE="variables.tfvars"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at path $ENV_FILE"
  exit 1
fi

# Empty the tfvars file if it exists or create a new one
> "$TFVARS_FILE"

# Read each line in the .env file
while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip empty lines and lines which start with #
  if [ -z "$line" ] || [[ $line == \#* ]]; then
    continue
  fi

  # Split the line into key and value
  IFS='=' read -r key value <<< "$line"

  # Remove leading and trailing quotes from value
  value="${value%\"}"
  value="${value#\"}"

  # Escape only the internal double quotes in the value
  value="${value//\"/\\\"}"

  # Write the variable to the tfvars file
  # Enclose the value in double quotes
  echo "${key} = \"${value}\"" >> "$TFVARS_FILE"
done < "$ENV_FILE"

echo "variables.tfvars file has been created."
