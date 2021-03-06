const Router = require('koa-router');
const dv = require('../../utils/dataValidator');
const config = require('../../config/config');
const _ = require('lodash');
const taskUserService = require('../../service/taskUserService');
const taskUserStatusConfig = require('../../config/statusConfig').taskUserStatus;
const taskStatusConfig = require('../../config/statusConfig').taskStatus;
const taskService = require('../../service/taskService');
const evaluateService = require('../../service/evaluateService');
const ctxHandler = require('../../utils/ctxHandler');

const router = new Router();

router.post('/', async (ctx) => {
  const {
    tId,
    uId,
    level,
    content,
  } = ctx.request.body;
  const evaluateInfo = {
    taskId: tId,
    userId: uId,
    level,
  };

  const err = dv.isParamsInvalid(evaluateInfo);

  if (err) {
    ctxHandler.handle400(ctx, `${err} 字段填写错误`);
    return;
  }

  if (level < 1 || level > 5) {
    ctxHandler.handle400(ctx, '评价等级错误');
    return;
  }

  let result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  if (!result || result.count < 1) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.FINISHED) {
    ctxHandler.handle400(ctx, '当前状态不可评价');
    return;
  }

  evaluateInfo.taskUserId = result.id;

  result = await taskService.queryTasks({ id: tId, isActive: 1, status: taskStatusConfig.SUCCESS });

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  if (result.count < 1) {
    ctxHandler.handle400(ctx, '当前任务状态不可评价');
    return;
  }

  evaluateInfo.content = content;

  result = await evaluateService.queryEvaluate({ taskId: tId, userId: uId });

  if (!result || result.count !== 0) {
    ctxHandler.handle400(ctx, '系统错误或已经评价');
    return;
  }

  result = await evaluateService.addEvaluate(evaluateInfo);

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '评价成功',
  };
});

/**
 * 查询评价信息
 */
router.get('/', async (ctx) => {
  const { tId, level } = ctx.query;
  let {
    page = 1,
    pageCount = config.pageCount,
  } = ctx.query;

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

  const err = await dv.isParamsInvalid({ tId });

  if (err) {
    ctxHandler.handle400(ctx, 'tId 参数有误');
    return;
  }

  const result = await evaluateService.queryEvaluate({ taskId: tId, level }, [], page, pageCount);

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  const { count } = result;

  const rows = result.rows.map(v => _.omit(v, ['user', 'task', 'userId']));

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '查询成功',
    page,
    pageCount,
    totalPage: Math.ceil(count / pageCount),
    data: rows,
  };
});

module.exports = router;
