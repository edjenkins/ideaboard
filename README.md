# Ideaboard

> Ideaboard is an online tool for having rich discussions around a topic. It can be used for an extensive range of activites such as designing products, organising events or gathering feedback from customers.

> Developed at Open Lab, Newcastle University as an open-source project to support new and upcoming research projects.

## Contributors
| Name | Contribution | Contact |
| --- | --- | --- |
| `Edward Jenkins` | `Lead developer` | [edjenkins.co.uk](https://edjenkins.co.uk), [@edjenkins91](https://twitter.com/edjenkins91)|

## Features

### Ideas
An idea consists of the several properties; Title, tagline, description and image. These are used to portray a high level idea, task or aim which users can work towards solving using the available tools. Ideas can be created by anyone and can belong to a category to aid sorting.

### Design
Users can create ideas which are then collaboratively designed in a workspace. There are several modules available in the workspace including the following:
- Chat
- Media
- Poll
- Rich text
- Video call
- Whiteboard
- Record video

### Outcome
Once an idea has been designed it is possi

## Deployments
| Name | Description | Link |
| --- | --- | --- |
| `Main` | `The public version of the site which can be used to develop any idea.` | [ideaboard.co.uk](https://ideaboard.co.uk)|
| `Myto` | `A collaborative design experiment working with experts to develop ideas around mitochondrial disease.` | [myto.ideaboard.co.uk](https://myto.ideaboard.co.uk)|


## Details
- Vue.js frontend which communicates with a vanilla Express node.js server.
  - node.js - [nodejs.org](https://nodejs.org)
  - Vue.js - [vuejs.org](https://vuejs.org)
  - Express - [expressjs.com](https://expressjs.com)
- Webpack is used to build front-end
  - Webpack - [webpack.js.org](https://webpack.js.org/)
- Redis for session support.
  - Redis - [redis.io](https://redis.io/)
- Caddy server for automatic SSL and domain configuration.
  - Caddy - [caddyserver.com](https://caddyserver.com/)
- AWS Elastic Transcoder for remote video encoding and thumbnail generation.
  - AWS Elastic Transcoder - [aws.amazon.com/elastictranscoder](https://aws.amazon.com/elastictranscoder)
- AWS S3 for storage of media and other user-generated content.
  - AWS S3 - [aws.amazon.com/s3](https://aws.amazon.com/s3)


## Getting started

### Start by pulling this repository and creating the required .env to store private keys/passwords/secrets (use the examples provided).
```
cp ./example.env ./.env
cp ./api/example.env ./api/.env
```

### Install node dependencies from [npmjs.com](https://www.npmjs.com/) for client and server.
```
cd app && npm install
cd ..
cd api && npm install
```

### Spin up the docker stack. This will fire up the API, redis, mongo and some helper containers.
```
docker-compose up -d
```

## Monitor the containers
```
docker-compose logs -f [CONTAINER_NAME]
```

## Start webpack to serve development files
``` bash
# Move into app directory
cd app

# Serve app with hot reload enabled (localhost:8080)
npm run dev
```

## Adding an instance
Ideaboard supports multiple subdomains/instances. New instances can be added quite simply.

There are several steps to adding a new instance:

- Add a homepage component to the instances directory - /app/src/components/instances/example.vue.

- Add configuration for instance - app/src/config.js.

- Update the 'Caddyfile' with the new subdomain

## Contributing
Please feel free to pull the code and add to it where you see fit. If you do anything interesting tweet me [@edjenkins91](https://twitter.com/edjenkins91)