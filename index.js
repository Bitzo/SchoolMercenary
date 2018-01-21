const Koa = require('koa');
const router = require('./router');
const views = require('koa-views');
const bodyparser = require('koa-bodyparser');
const koaBody = require('koa-body');
const statics = require('koa-static');
const path = require('path');
const config = require('./config/config');
const moment = require('moment');
const session = require('koa-session2');
const Store = require('./utils/redisUtils');
require('./GLOBAL_VALS');

const app = new Koa();

// set static files path
const staticFIlesPath = './public';

// set views like path,ext...
app.use(views(path.join(__dirname, '/public'), {
  // extension: 'html',
}));

app.use(statics(path.join(__dirname, staticFIlesPath)));

// session
app.use(session({
  key: 'SESSIONID',
  store: new Store(),
  maxAge: '1800000',
}));

app.use(koaBody({ multipart: true }));
// body handler, resolve post data
app.use(bodyparser());

// routers
app.use(router.routes());

// handle 404 page
app.use(async (ctx) => {
  ctx.response.status = 404;
  const date = moment().format('YY/MM/DD HH:mm:ss');
  console.log(`
    ===  Error  =============================================
    | ${date}:  {${ctx.method}} ${ctx.url}
    =========================================================`);
  // ctx.body = 'Oops, Not Found!';
  ctx.body = `
      <h1>Page Can Not Found!</h1>
      <h2>Please check API Doc.</h2>
      <h2>${date}:  {${ctx.method}} ${ctx.url}</h2>
  `;
});

app.listen(config.port);

console.log(`Server is listening on port ${config.port}`);
