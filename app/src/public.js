const KoaGraphQL = require('koa-graphql');
const KoaRouter = require('koa-router');

const schema = require('./graphql/schema');
const pkg = require('../package.json');

module.exports = () => {
  const router = KoaRouter();

  router.all('/graphql', KoaGraphQL({
    graphiql: true,
    schema,
  }));

  router.get('/', async (ctx) => {
    ctx.response.status = 200;
    ctx.response.body = {
      name: pkg.name,
      dependencies: pkg.dependencies,
    };
  });

  return router;
};
