const Router = require('koa-router');
const config = require('../../config/config');
const _ = require('lodash');
const msgService = require('../../service/messageService');

const router = new Router();

/**
 * @api 查询消息通知
 * @param {Integer} page
 * @param {Integer} pageCount
 * @param {String} title
 */
router.get('/', async (ctx) => {
  const { title } = ctx.query;
  let {
    page = 1,
    pageCount = config.pageCount,
  } = ctx.query;

  page = _.toNumber(page);
  pageCount = _.toNumber(pageCount);

  if (Number.isNaN(page) || page < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: 'page 参数有误',
    };
    return;
  }

  if (Number.isNaN(pageCount) || pageCount < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: 'pageCount 参数有误',
    };
    return;
  }

  const results = await msgService.queryMessages({ title, status: 1 }, [], page, pageCount);

  if (results !== false) {
    let messages = results.rows;
    const { count } = results;

    messages = messages.map((value) => {
      const msg = value;
      msg.from = msg.user.username;
      return _.omit(msg, ['uId', 'status', 'user']);
    });

    ctx.status = 200;
    ctx.body = {
      status: 200,
      isSuccess: true,
      msg: '查询成功',
      page,
      pageCount,
      totalPage: Math.ceil(count / pageCount),
      data: messages,
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
