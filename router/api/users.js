const Router = require('koa-router');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const fileUtils = require('../../utils/fileUtils');
const moment = require('moment');
const userService = require('../../service/userService');
const config = require('../../config/config');
const dv = require('../../utils/dataValidator');
const encrypt = require('../../utils/encrypt');
const ctxHandler = require('../../utils/ctxHandler');

const router = new Router();

/**
 * @api 获取用户信息
 * @param {Integer} id
 * @param {String} username
 * @param {String} email
 * @param {Integer} page
 * @param {Integer} pageCount
 */
router.get('/', async (ctx) => {
  const {
    id,
    username,
    email,
  } = ctx.query;
  const userInfo = {
    id,
    username,
    email,
  };
  let { page = 1, pageCount = config.pageCount } = ctx.query;

  page = _.toNumber(page);
  pageCount = _.toNumber(pageCount);

  if (Number.isNaN(page) || page < 1) {
    ctxHandler.handle400(ctx, 'page 参数有误');
    return;
  }

  if (Number.isNaN(pageCount) || pageCount < 1) {
    ctxHandler.handle400(ctx, 'pageCount 参数有误');
    return;
  }

  let users = await userService.queryUsers(userInfo, [], page, pageCount);

  if (users) {
    const { count, rows } = users;
    users = rows.map(value => _.omit(value, ['password', 'key', 'isActive', 'role', 'createTime']));
    ctx.status = 200;
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '查询成功',
      page,
      pageCount: users.length,
      totalPage: Math.ceil(count / pageCount),
      data: users,
    };
    return;
  }

  ctxHandler.handle400(ctx, '查询失败');
});

/**
 * @api 修改用户信息
 * @param {string} nickname
 * @param {boolean} gender
 * @param {date} birthday
 * @param {string} desc
 */
router.put('/:id', async (ctx, next) => {
  const id = _.toNumber(ctx.params.id);
  const {
    nickname,
    gender,
    birthday,
    desc,
  } = ctx.request.body;
  const userInfo = {
    id,
    nickname,
    gender,
    birthday,
    desc,
  };

  if (Number.isNaN(id)) {
    next();
    return;
  }

  if (id !== ctx.token.id) {
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }

  if (!moment(birthday).isValid()) {
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '时间值非法',
    };
    return;
  }

  const result = await userService.updateUser(userInfo);

  if (result === false) {
    ctxHandler.handle400(ctx, '修改失败');
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '修改成功',
  };
});

/**
 * @api 修改用户头像
 * @param {Object} file
 */
router.put('/avatar/:id', async (ctx) => {
  const id = _.toNumber(ctx.params.id);
  const dir = 'public/img/avatar';
  const filename = `${moment().format('YYYYMMDDHHmmss')}${ctx.token.id}${Math.floor(Math.random() * 100)}`;
  let res = await fileUtils.saveFile(ctx, 'avatar', dir, filename, 'image', 2);

  if (id !== ctx.token.id) {
    ctxHandler.handle400(ctx, '没有权限');
    return;
  }

  if (res.isSuccess) {
    let userInfo = await userService.queryUsers({ id });
    [userInfo] = userInfo.rows;
    const originFile = userInfo.avatar;
    if (originFile !== '/img/avatar.jpg') {
      const file = path.join(APP_PATH, `/public${originFile}`);
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }

    res = await userService.updateUser({ id, avatar: `/img/avatar/${res.data}` });

    if (res !== false) {
      ctx.status = 200;
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '修改成功',
      };
      return;
    }

    ctxHandler.handle400(ctx, '上传失败');
    return;
  }

  ctxHandler.handle400(ctx, res.data);
});

/**
 * @api 修改密码
 * @param {Integer} id
 * @param {string} password
 */
router.put('/password/:id', async (ctx, next) => {
  const id = _.toNumber(ctx.params.id);
  const { password } = ctx.request.body;

  if (Number.isNaN(id)) {
    next();
    return;
  }

  if (id !== ctx.token.id) {
    ctxHandler.handle400(ctx, '没有权限');
    return;
  }

  if (dv.isParamsInvalid({ password })) {
    ctxHandler.handle400(ctx, '密码不合法');
    return;
  }

  const { encrypted, key } = await encrypt.encrypt(password);
  const result = await userService.updateUser({ password: encrypted, key, id });

  if (result !== false) {
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '修改成功',
    };
    return;
  }

  ctxHandler.handle400(ctx, '修改失败');
});

module.exports = router;
