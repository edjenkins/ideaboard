#!/bin/bash

# Move into api dir
cd ~/sites/ideaboard/api

# Run npm install process
npm install

# Move into app dir
cd ../app

# Run npm install process
npm install

# Run npm build process
npm run build

# Move back out of app dir
cd ..

# Remove existing docker containers
sudo docker-compose rm -f app

# Initialise and up docker containers
sudo docker-compose up -d app

# Output logs
sudo docker-compose logs -f app
