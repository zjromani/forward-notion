#!/bin/bash

# Stop on first error
set -e

VERSION=$(date +%Y%m%d%H%M%S)
echo $VERSION > version.txt

echo "Building and zipping the Lambda function..."
npm run build
cd dist && zip -r ../app-$VERSION.zip . && cd ..
zip -ur app-$VERSION.zip node_modules

echo "Cleaning up old zip files..."
find . -maxdepth 1 -name 'app-*.zip' ! -name "app-$VERSION.zip" -exec rm {} \;

echo "Uploading to S3..."
aws s3 cp app-$VERSION.zip s3://forward-notion --profile personal

echo "Deploying with Terraform..."
terraform apply -var "s3_key=app-$VERSION.zip" -var-file=variables.tfvars -auto-approve

echo "Deployment completed successfully."
