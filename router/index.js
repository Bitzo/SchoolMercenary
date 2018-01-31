const Router = require('koa-router');
const apiAuth = require('../utils/apiAuth');
const usersRouter = require('./api/users');
const messagesRouter = require('./api/message');
const dicRouter = require('./api/dicRouter');
const registRouter = require('./api/registRouter');
const loginRouter = require('./api/loginRouter');
const taskRouter = require('./api/taskRouter');
const taskUserRouter = require('./api/taskUserRouter');

const router = new Router();

router.get('/', (ctx) => {
  ctx.status = 200;
  return ctx.render('index', {
    title: 'Home',
    name: 'Bitzo',
  });
});

/**
 * 接口鉴权
 */
router.all('/api/*', async (ctx, next) => {
  const result = await apiAuth.tokenCheck(ctx);
  if (result && !result.isSuccess) {
    ctx.status = 403;
    ctx.body = {
      status: 403,
      isSuccess: false,
      msg: result.msg,
    };
  } else {
    await next();
  }
});

router.use('/api/users', usersRouter.routes());
router.use('/api/messages', messagesRouter.routes());
router.use('/api/dictionary', dicRouter.routes());
router.use('/api/register', registRouter.routes());
router.use('/api/login', loginRouter.routes());
router.use('/api/tasks', taskRouter.routes());
router.use('/api/taskuser', taskUserRouter.routes());

module.exports = router;
