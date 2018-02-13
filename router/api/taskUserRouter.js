const Router = require('koa-router');
const taskService = require('../../service/taskService');
const moment = require('moment');
const _ = require('lodash');
const config = require('../../config/config');
const taskUserStatusConfig = require('../../config/statusConfig').taskUserStatus;
const taskStatusConfig = require('../../config/statusConfig').taskStatus;
const taskUserService = require('../../service/taskUserService');
const ctxHandler = require('../../utils/ctxHandler');

const router = new Router();

/**
 * 申请任务
 */
router.post('/', async (ctx) => {
  let { tId, uId } = ctx.request.body;
  const taskUserInfo = {
    tId,
    uId,
    status: taskUserStatusConfig.PENDING,
  };

  tId = _.toNumber(tId);
  uId = _.toNumber(uId);

  if (ctx.token.id !== uId) {
    ctxHandler.handle400(ctx, '没有权限');
    return;
  }

  let result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  // 如果已经申请过，且还有效，则拒绝多次申请
  if (result.count > 0) {
    ctxHandler.handle400(ctx, '您已申请，请等待回复');
    return;
  }

  result = await taskService.queryTasks({ id: tId, isActive: 1 });

  if (!result || result.count < 1) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  [result] = result.rows;

  // 任务状态不是PENDING, 则不能继续申请
  if (result.status !== taskStatusConfig.PENDING) {
    ctxHandler.handle400(ctx, '您申请的任务已不能申请参与');
    return;
  }

  if (result.uId === uId) {
    ctxHandler.handle400(ctx, '您申请的自己组织的任务');
    return;
  }

  result = await taskUserService.addTaskUser(taskUserInfo);

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '申请成功',
  };
});

/**
 * 取消任务申请
 */
router.put('/cancel/:tId', async (ctx) => {
  const tId = _.toNumber(ctx.params.tId);
  const uId = ctx.token.id;

  let result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  if (!result || result.count < 1) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.PENDING) {
    ctxHandler.handle400(ctx, '当前任务状态下不允许取消');
    return;
  }

  const { id } = result;
  result = taskUserService.updateTaskUser({
    status: taskUserStatusConfig.CANCELED,
  }, { id });

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '操作成功',
  };
});

/**
 * 接受/拒绝任务申请
 */
router.put('/:tId/:uId', async (ctx) => {
  let { tId, uId } = ctx.params;
  let { status } = ctx.request.body;
  const userId = ctx.token.id;

  status = _.toNumber(status);

  if (status) status = true;
  else status = false;

  tId = _.toNumber(tId);
  uId = _.toNumber(uId);

  let result = await taskService.queryTasks({ id: tId, uId: userId, isActive: 1 });

  if (!result || result.count < 1) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.PENDING) {
    ctxHandler.handle400(ctx, '当前状态下不需要审核');
    return;
  }

  let willBeFulfilled = false;
  const { count } = result;

  if (result.memberCount - result.count === 1) willBeFulfilled = true;

  result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  if (!result || result.count < 1) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.PENDING) {
    ctxHandler.handle400(ctx, '当前状态不需审核');
    return;
  }

  const { id } = result;

  if (status) {
    // 同意申请
    result = await taskUserService.updateTaskUser({
      status: taskUserStatusConfig.ACCEPTED,
      acceptedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }, { id });

    if (!result) {
      ctxHandler.handle400(ctx, '系统错误');
      return;
    }

    const taskStatus = willBeFulfilled ? taskStatusConfig.FULFILLED : taskStatusConfig.PENDING;

    result = await taskService.updateTask({ id: tId, count: count + 1, status: taskStatus });
  } else {
    // 拒绝申请
    result = await taskUserService.updateTaskUser({
      status: taskUserStatusConfig.REJECTED,
      acceptedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    }, { id });
  }
  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
    return;
  }
  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '操作成功',
  };
});

/**
 * 查询任务
 */
router.get('/', async (ctx) => {
  let {
    uId,
    tId,
    status,
    page = 1,
    pageCount = config.pageCount,
  } = ctx.query;

  uId = _.toNumber(uId);
  tId = _.toNumber(tId);
  status = _.toNumber(status);
  page = _.toNumber(page);
  pageCount = _.toNumber(pageCount);

  if (Number.isNaN(status)) status = '';

  if (Number.isNaN(page) || page < 1) {
    ctxHandler.handle400(ctx, 'page 参数有误');
    return;
  }

  if (Number.isNaN(pageCount) || pageCount < 1) {
    ctxHandler.handle400(ctx, 'pageCount 参数有误');
    return;
  }

  let result = {};

  if (tId) {
    result = await taskUserService.queryTaskUser(
      { tId, status, isActive: 1 },
      [],
      page,
      pageCount,
    );
    if (result) {
      result.rows = result.rows.map(value => _.omit(value, 'task'));
    }
  } else if (uId) {
    result = await taskUserService.queryTaskUser({ uId, status, isActive: 1 }, [], page, pageCount);
    if (result) {
      result.rows = result.rows.map(value => _.omit(value, 'user'));
    }
  } else {
    ctxHandler.handle400(ctx, 'uId, tId 参数不合规范');
    return;
  }

  if (!result) {
    ctxHandler.handle400(ctx, '系统错误');
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '查询成功',
    page,
    pageCount,
    totalPage: Math.ceil(result.count / pageCount),
    data: result.rows,
  };
});

module.exports = router;
