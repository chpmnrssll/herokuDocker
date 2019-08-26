/* eslint max-len: off */
const KoaRouter = require('koa-router');
// const RandomString = require('randomstring');

module.exports = (App, Data) => {
  const router = KoaRouter();

  router.get('/api/v1/posts/:id', async (ctx) => {
    ctx.response.body = await Data.getPostById(ctx.db, ctx.params.id);
    // ctx.body = await Data.getFiles(ctx.db, ctx.params.ownerType, ctx.params.ownerId, ctx.params.category);
  });

  // router.post('/api/v1/files/:ownerType/:ownerId/:category', async (ctx) => {
  //   const { body } = ctx.request;
  //
  //   const created = await Data.createFile(ctx.db, {
  //     slug: RandomString.generate(32),
  //     ownerType: ctx.params.ownerType,
  //     ownerId: ctx.params.ownerId,
  //     category: ctx.params.category,
  //     name: body.name,
  //     contentType: body.contentType || 'application/octet-stream',
  //     contentBase64: body.contentBase64 || '',
  //   });
  //
  //   ctx.status = 201;
  //   ctx.body = await Data.getFileById(ctx.db, created);
  // });
  //
  // router.delete('/api/v1/files/:ownerType/:ownerId/:category/:id', async (ctx) => {
  //   const deleted = await Data.deleteFile(ctx.db, ctx.params.ownerType, ctx.params.ownerId, ctx.params.category, ctx.params.id);
  //
  //   if (deleted) {
  //     ctx.status = 204;
  //   } else {
  //     ctx.throw(404, 'File Not Found');
  //   }
  // });

  return router;
};
