#!/bin/bash

# Move into api dir
cd /root/sites/ideaboard/api

# Run npm install process
# npm install

# Move into app dir
cd ../app

# Run npm install process
# npm install

# Run npm build process
npm run build

# Remove serve dir
rm -r serve

# Create serve dir
mkdir serve

# Copy built app into serve dir
cp -R dist/* serve

# Move back out of app dir
cd ..

# Remove existing docker containers
docker-compose stop app

# Remove existing docker containers
docker-compose rm -f app

# Initialise and up docker containers
docker-compose up -d app

# Output logs
docker-compose logs -f app
