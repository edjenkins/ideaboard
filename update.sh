#!/bin/bash

# Move into api dir
cd ~/sites/ideaboard/api

# Run npm install process
npm install

# Move into app dir
cd ../app

# Run npm build process
npm run build

# Move back out of app dir
cd ..

# Remove existing docker containers
sudo docker-compose rm -f

# Initialise and up docker containers
sudo docker-compose up -d
