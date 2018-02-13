const Router = require('koa-router');
const _ = require('lodash');
const dv = require('../../utils/dataValidator');
const userService = require('../../service/userService');
const crypt = require('../../utils/encrypt');
const smsUtils = require('../../utils/smsUtils');
const ctxHandler = require('../../utils/ctxHandler');

const router = new Router();

/**
 * @api 用户注册-常规法
 * @param {string} username
 * @param {string} password
 * @param {string} nickname
 */
router.post('/normal', async (ctx) => {
  const { username, password, nickname } = ctx.request.body;
  const userInfo = { username, password, nickname };
  const err = dv.isParamsInvalid(userInfo);

  if (err) {
    ctxHandler.handle400(ctx, `{ ${err} } 参数填写不正确`);
    return;
  }

  let result = await userService.queryUsers({ username });

  if (!result || result.count) {
    ctxHandler.handle400(ctx, '注册失败, 用户名重复。');
    return;
  }

  const { encrypted, key } = crypt.encrypt(password);

  userInfo.password = encrypted;
  userInfo.key = key;

  result = await userService.addUser(userInfo);

  if (!result) {
    ctxHandler.handle400(ctx, '注册失败');
    return;
  }

  ctx.status = 200;
  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '注册成功',
  };
});

/**
 * @api 获取手机验证码
 * @param {string} phoneNumber
 */
router.post('/phoneCode', async (ctx) => {
  const { phoneNumber } = ctx.request.body;

  if (dv.isParamsInvalid({ phoneNumber })) {
    ctxHandler.handle400(ctx, '{phoneNumber} 无效');
    return;
  }

  if (!dv.isPoneAvailable(phoneNumber)) {
    ctxHandler.handle400(ctx, '手机号无效');
    return;
  }

  let result = await userService.queryUsers({ phoneNumber });

  if (result) {
    if (result.count > 0) {
      ctxHandler.handle400(ctx, '手机号已注册');
      return;
    }

    ctx.session.code = Math.floor((Math.random() * 9000) + 1000);
    ctx.session.phoneNumber = phoneNumber;

    const { code } = ctx.session;
    result = smsUtils.sendSMS(phoneNumber, code);
    if (result) {
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '发送成功',
      };
      return;
    }
  }

  ctxHandler.handle400(ctx, '系统错误, 发送失败');
});

/**
 * @api 用户注册-手机注册
 * @param {string} nickname
 * @param {string} phoneNumber
 * @param {string} code
 * @param {string} password
 */
router.post('/phone', async (ctx) => {
  const {
    password,
    nickname,
    phoneNumber,
    code,
  } = ctx.request.body;

  if (!ctx.session.phoneNumber || ctx.session.phoneNumber !== phoneNumber) {
    ctxHandler.handle400(ctx, '手机号码异常');
    return;
  }

  if (!ctx.session.code) {
    ctxHandler.handle400(ctx, '验证码过期');
    return;
  }

  if (_.toNumber(code) !== ctx.session.code) {
    ctxHandler.handle400(ctx, '验证码错误');
    return;
  }

  const username = phoneNumber;
  const userInfo = {
    username,
    password,
    nickname,
    phoneNumber,
  };
  const err = dv.isParamsInvalid(userInfo);

  if (err) {
    ctxHandler.handle400(ctx, `{ ${err} } 参数填写不正确`);
    return;
  }

  let result = await userService.queryUsers({ username });

  if (!result || result.count) {
    ctxHandler.handle400(ctx, '注册失败, 用户名重复。');
    return;
  }

  result = await userService.queryUsers({ phoneNumber });

  if (!result || result.count) {
    ctxHandler.handle400(ctx, '注册失败, 手机号已注册。');
    return;
  }

  const { encrypted, key } = crypt.encrypt(password);

  userInfo.password = encrypted;
  userInfo.key = key;

  result = await userService.addUser(userInfo);

  if (!result) {
    ctxHandler.handle400(ctx, '注册失败');
    return;
  }

  ctx.status = 200;
  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '注册成功',
  };
});

module.exports = router;
