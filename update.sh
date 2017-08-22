#!/bin/bash

# Move into app dir
cd ~/sites/ideaboard/app

# Run npm build process
npm run build

# Move back out of app dir
cd ..

# Remove existing docker containers
sudo docker-compose rm -f

# Initialise and up docker containers
sudo docker-compose up -d
