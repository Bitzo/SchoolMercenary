const Router = require('koa-router');
const taskService = require('../../service/taskService');
const dv = require('../../utils/dataValidator');
const moment = require('moment');
const _ = require('lodash');
const userService = require('../../service/userService');
const config = require('../../config/config');
const taskUserStatusConfig = require('../../config/statusConfig').taskUserStatus;
const taskStatusConfig = require('../../config/statusConfig').taskStatus;
const taskUserService = require('../../service/taskUserService');

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
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }

  let result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

  // 如果已经申请过，且还有效，则拒绝多次申请
  if (result.count > 0) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '您已申请，请等待回复',
    };
    return;
  }

  result = await taskService.queryTasks({ id: tId, isActive: 1 });

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

  // 任务状态不是PENDING, 则不能继续申请
  if (result.status !== taskStatusConfig.PENDING) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '您申请的任务已不能申请参与',
    };
    return;
  }

  if (result.uId === uId) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '您申请的自己组织的任务',
    };
    return;
  }

  result = await taskUserService.addTaskUser(taskUserInfo);

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
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  [result] = result.rows;

  if (result.status !== taskUserStatusConfig.PENDING) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前任务状态下不允许取消',
    };
    return;
  }

  const { id } = result;
  result = taskUserService.updateTaskUser({ id, status: taskUserStatusConfig.CANCELED });

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

  if (status) status = true;
  else status = false;

  tId = _.toNumber(tId);
  uId = _.toNumber(uId);

  let result = await taskService.queryTasks({ id: tId, uId: userId, isActive: 1 });

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

  if (result.status !== taskUserStatusConfig.PENDING) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前状态下不需要审核',
    };
    return;
  }

  let willBeFulfilled = false;
  const { count } = result;

  if (result.memberCount - result.count === 1) willBeFulfilled = true;

  result = await taskUserService.queryTaskUser({ tId, uId, isActive: 1 });

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

  if (result.status !== taskUserStatusConfig.PENDING) {
    if (!result || result.count < 1) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        isSuccess: false,
        msg: '当前状态不需审核',
      };
      return;
    }
  }

  const { id } = result;

  if (status) {
    // 同意申请
    result = await taskUserService.updateTaskUser({ id, status: taskUserStatusConfig.ACCEPTED, acceptedTime: moment().format('YYYY-MM-DD HH:mm:ss') });

    if (!result) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        isSuccess: false,
        msg: '系统错误',
      };
      return;
    }

    const taskStatus = willBeFulfilled ? taskStatusConfig.FULFILLED : taskStatusConfig.PENDING;

    result = await taskService.updateTask({ id: tId, count: count + 1, status: taskStatus });

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
      msg: '操作成功',
    };
  } else {
    // 拒绝申请
    // TODO: reject
  }
});

module.exports = router;
