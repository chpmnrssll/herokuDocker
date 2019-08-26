# Node.js & MongoDB Docker Compose

This is a simple Node.js & MongoDB Docker Compose config for use on Heroku.

Example app comes with Koa, GraphQL, Mongoose, and ESLint setup.

## Usage

Run `docker-compose up`.

## Configuration

By default the Node.js container will listen on port `8080`, to change it edit the `ports` section of the `web` service in the `docker-compose.yml` file.

By default the MongoDB container will listen on port `27017`, to change it edit the `ports` section of the `mongo` service in the `docker-compose.yml` file.

Docker Compose will run `yarn dev` if `NODE_ENV=development` or `yarn start` if `NODE_ENV=production`. See `.env.example`.

## Reference

- [Building Docker Images with heroku.yml](https://devcenter.heroku.com/articles/build-docker-images-heroku-yml)
- [Heroku Local Development with Docker Compose](https://devcenter.heroku.com/articles/local-development-with-docker-compose)
