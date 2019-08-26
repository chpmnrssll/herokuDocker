/* eslint no-console: off */
// const BasicAuth = require('basic-auth');
const Koa = require('koa');
const KoaBody = require('koa-body');
const KoaCompress = require('koa-compress');
const KoaCors = require('koa-cors');
const KoaLogger = require('koa-logger');
const KoaStatic = require('koa-static');
const Zlib = require('zlib');

const PostsApi = require('./api/api-posts');
const PublicApi = require('./public');

module.exports = (Data) => {
  const app = new Koa();
  const APP_PORT = process.env.PORT || process.env.APP_PORT || 8080;

  // Parse requests
  app.use(KoaBody({ multipart: true, formLimit: '1mb', jsonLimit: '40mb' }));

  // Compress responses
  app.use(KoaCompress({
    filter: (contentType) => /json|text/i.test(contentType),
    threshold: 2048,
    flush: Zlib.Z_SYNC_FLUSH,
  }));

  // Use CORS
  app.use(KoaCors());

  // Format errors as JSON
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
      ctx.response.status = error.status || 500;
      ctx.response.body = {
        message: error.message || error.toString(),
      };
    }
  });

  // Log requests
  app.use(KoaLogger());

  // Tie a DB connection to every request
  app.use(async (ctx, next) => {
    try {
      ctx.db = await Data.getConnection();
      // await ctx.db.beginTransaction();
      await next();
      // await ctx.db.commit();
      // await Data.releaseConnection(ctx.db);
    } catch (error) {
      console.log(error);

      // if (ctx.db) {
      //   await ctx.db.rollback();
      //   await Data.releaseConnection(ctx.db);
      // }

      throw error;
    }
  });

  // Use the API routes
  app.use(PostsApi(app, Data).routes());

  // Add the public routes
  app.use(PublicApi(app, Data).routes());

  // Serve static content
  app.use(KoaStatic('static', {}));

  // Listen on port $APP_PORT and return the server
  app.listen(APP_PORT);
};
