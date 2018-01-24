const Router = require('koa-router');
const _ = require('lodash');
const dv = require('../../utils/dataValidator');
const userService = require('../../service/userService');
const crypt = require('../../utils/encrypt');
const validAuth = require('../../utils/validAuth');

const router = new Router();

/**
 * @api 用户登录
 * @param {string} account
 * @param {string} password
 */
router.post('/', async (ctx) => {
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

module.exports = router;
