const Router = require('koa-router');
const _ = require('lodash');
const dv = require('../../utils/dataValidator');
const dicService = require('../../service/dicService');

const router = new Router();

router.get('/', async (ctx) => {
  const { category, id } = ctx.query;
  let parent;
  let pass = false;

  if (dv.isParamsValid({ category })) {
    pass = true;
  }

  if (dv.isParamsValid({ id })) {
    parent = _.toNumber(id);
    pass = true;
  }

  if (pass) {
    const param = { category, parent };
    const result = await dicService.queryDic(param);
    if (result !== false) {
      const dic = result.rows;
      ctx.status = 200;
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '查询成功',
        data: dic,
      };
      return;
    }
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: '请至少提供一个参数',
  };
});

module.exports = router;
