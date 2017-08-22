cd app
npm run build
cd ..
sudo docker-compose rm -f
sudo docker-compose up -d
sudo docker-compose logs -f
