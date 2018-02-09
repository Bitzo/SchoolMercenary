const Router = require('koa-router');
const dv = require('../../utils/dataValidator');
const taskUserService = require('../../service/taskUserService');
const taskUserStatusConfig = require('../../config/statusConfig').taskUserStatus;
const taskStatusConfig = require('../../config/statusConfig').taskStatus;
const taskService = require('../../service/taskService');
const evaluateService = require('../../service/evaluateService');

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
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `${err} 字段填写错误`,
    };
    return;
  }

  let result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  if (!result || result.count < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.ACCEPTED) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前状态不可评价',
    };
    return;
  }

  evaluateInfo.taskUserId = result.id;

  result = await taskService.queryTasks({ id: tId, isActive: 1, status: taskStatusConfig.SUCCESS });

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  if (result.count < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前任务状态不可评价',
    };
    return;
  }

  evaluateInfo.content = content;

  result = await evaluateService.queryEvaluate({ taskId: tId, userId: uId });

  if (!result || result.count !== 0) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误或已经评价',
    };
    return;
  }

  result = await evaluateService.addEvaluate(evaluateInfo);

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '评价成功',
  };
});


module.exports = router;
