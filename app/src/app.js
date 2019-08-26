const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');
const pkg = require('../package.json');

const app = new Koa();
const router = new Router();

const DB_NAME = '/posts';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_URL = process.env.MONGODB_URI || `mongodb://db:${DB_PORT}${DB_NAME}`;
const APP_PORT = process.env.PORT || process.env.APP_PORT || 8080;

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.on('error', (error) => { throw new Error(error); });
app.listen(APP_PORT);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  app.context.db = mongoose.connection;
});

router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

router.get('/', (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = {
    name: pkg.name,
    dependencies: pkg.dependencies,
  };

  next();
});
