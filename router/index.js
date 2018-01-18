const Router = require('koa-router');
const _ = require('lodash');
const usersRouter = require('./api/users');
const dv = require('../utils/dataValidator');
const crypt = require('../utils/encrypt');
const userService = require('../service/userService');
const validAuth = require('../utils/validAuth');
const apiAuth = require('../utils/apiAuth');

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

/**
 * @api 用户注册-常规法
 * @param {string} username
 * @param {password} password
 */
router.post('/api/register/normal', async (ctx) => {
  const { username, password, nickname } = ctx.request.body;
  const userInfo = { username, password, nickname };

  const err = dv.isParamsInvalid(userInfo);

  if (err) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `{ ${err} } 参数填写不正确`,
    };
    return;
  }

  let result = await userService.queryUsers({ username });
  if (!result || result.count) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '注册失败, 用户名重复。',
    };
    return;
  }

  const { encrypted, key } = crypt.encrypt(password);

  userInfo.password = encrypted;
  userInfo.key = key;

  result = await userService.addUser(userInfo);

  if (result) {
    ctx.status = 200;
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '注册成功',
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '注册失败',
    };
  }
});

/**
 * @api 用户注册-手机注册
 * @param {string} username
 * @param {password} password
 */
router.post('/api/register/phone', async (ctx) => {
  const {
    username,
    password,
    nickname,
    phoneNumber,
  } = ctx.request.body;

  const userInfo = {
    username,
    password,
    nickname,
    phoneNumber,
  };

  const err = dv.isParamsInvalid(userInfo);

  if (err) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `{ ${err} } 参数填写不正确`,
    };
    return;
  }

  let result = await userService.queryUsers({ username });
  console.log(result);
  if (!result || result.count) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '注册失败, 用户名重复。',
    };
    return;
  }

  result = await userService.queryUsers({ phoneNumber });
  console.log(result);

  if (!result || result.count) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '注册失败, 手机号已注册。',
    };
    return;
  }

  const { encrypted, key } = crypt.encrypt(password);

  userInfo.password = encrypted;
  userInfo.key = key;

  result = await userService.addUser(userInfo);

  if (result) {
    ctx.status = 200;
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '注册成功',
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '注册失败',
    };
  }
});

/**
 * @api 用户登录
 * @param {string} username
 * @param {string} password
 */
router.post('/api/login', async (ctx) => {
  const { account, password } = ctx.request.body;

  const err = dv.isParamsInvalid({ account, password });

  if (err) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `{ ${err} } 参数填写错误`,
    };
    return;
  }

  let result = await userService.queryUsers({}, [
    {
      username: account,
    }, {
      nickname: account,
    }, {
      email: account,
    }, {
      phoneNumber: account,
    },
  ]);

  if (result && result.count === 1) {
    [result] = result.rows;
    const decryptPwd = await crypt.decrypt(result.password, result.key);
    if (decryptPwd === password) {
      const token = validAuth.getJWT({
        id: result.id,
        username: result.username,
      });
      let userInfo = await userService.queryUsers({ id: result.id });
      [userInfo] = userInfo.rows;
      userInfo = _.omit(userInfo, ['password', 'key', 'isActive', 'createTime', 'role']);
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '登录成功',
        token,
        userInfo,
      };
      return;
    }
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '登录失败',
    };
    return;
  }

  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: '登录失败',
  };
});

router.use('/api/users', usersRouter.routes());

module.exports = router;
