const Router = require('koa-router');
const _ = require('lodash');
const userService = require('../../service/userService');
const config = require('../../config/config');
const dv = require('../../utils/dataValidator');

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

module.exports = router;
