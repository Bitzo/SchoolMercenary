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

const router = new Router();

/**
 * @api 获取用户信息
 * @param {Integer} id
 * @param {String} username
 * @param {String} nickname
 * @param {String} email
 * @param {Integer} page
 * @param {Integer} pageCount
 */
router.get('/', async (ctx) => {
  const {
    id,
    username,
    nickname,
    email,
  } = ctx.query;

  const userInfo = {
    id,
    username,
    nickname,
    email,
  };

  let { page = 1, pageCount = config.pageCount } = ctx.query;

  const err = dv.isParamsInvalid({ page, pageCount });

  if (err) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `${err} 参数有误`,
    };
    return;
  }

  page = _.toNumber(page);
  pageCount = _.toNumber(pageCount);

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
  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: '查询失败',
  };
});

/**
 * @api 修改用户信息
 * @param {string} nickname
 * @param {boolean} gender
 * @param {date} birthday
 * @param {string} desc
 */
router.put('/:id', async (ctx, next) => {
  const {
    nickname,
    gender,
    birthday,
    desc,
  } = ctx.request.body;

  const id = _.toNumber(ctx.params.id);

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

  const userInfo = {
    id,
    nickname,
    gender,
    birthday,
    desc,
  };

  const result = await userService.updateUser(userInfo);

  if (result !== false) {
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '修改成功',
    };
  } else {
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '修改失败',
    };
  }
});

/**
 * @api 修改用户头像
 * @param {Object} file
 */
router.put('/avatar/:id', async (ctx) => {
  const id = _.toNumber(ctx.params.id);

  if (id !== ctx.token.id) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }
  const dir = 'public/img/avatar';
  const filename = `${moment().format('YYYYMMDDHHmmss')}${ctx.token.id}${Math.floor(Math.random() * 100)}`;
  let res = await fileUtils.saveFile(ctx, 'avatar', dir, filename, 'image', 2);
  console.log(res);
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
    if (res) {
      ctx.status = 200;
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '修改成功',
      };
      return;
    }
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '上传失败',
    };
    return;
  }
  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: res.data,
  };
});

/**
 * @api 修改密码
 * @param {Integer} id
 * @param {string} password
 */
router.put('/password/:id', async (ctx, next) => {
  const id = _.toNumber(ctx.params.id);

  if (Number.isNaN(id)) {
    next();
    return;
  }

  if (id !== ctx.token.id) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限1',
    };
    return;
  }

  const { password } = ctx.request.body;

  if (dv.isParamsInvalid({ password })) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '密码不合法',
    };
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
  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: '修改失败',
  };
});

module.exports = router;
