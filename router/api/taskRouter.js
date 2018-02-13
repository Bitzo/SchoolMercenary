const Router = require('koa-router');
const taskService = require('../../service/taskService');
const dv = require('../../utils/dataValidator');
const moment = require('moment');
const _ = require('lodash');
const userService = require('../../service/userService');
const dicService = require('../../service/dicService');
const config = require('../../config/config');
const taskUserService = require('../../service/taskUserService');
const taskStatusConfig = require('../../config/statusConfig').taskStatus;
const taskUserStatusConfig = require('../../config/statusConfig').taskUserStatus;

const router = new Router();

/**
 * 新增任务
 */
router.post('/', async (ctx) => {
  const {
    title,
    taskType,
    content,
    memberCount,
    time,
    address,
  } = ctx.request.body;
  const taskInfo = {
    title,
    taskType,
    time,
    address,
  };
  const err = dv.isParamsInvalid(taskInfo);

  if (err) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: `{${err}} 参数填写不正确`,
    };
    return;
  }

  if (!moment(time).isValid()) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '{time} 参数填写不正确, 不是一个正确的时间值',
    };
    return;
  }

  const now = moment().format('YYYY-MM-DD HH:mm:ss');

  if (moment(time).isBefore(now)) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '{time} 不能早于当前时间',
    };
    return;
  }

  const userId = ctx.token.id;

  taskInfo.uId = userId;
  taskInfo.content = content;
  taskInfo.memberCount = memberCount || 1;

  const result = await taskService.addTask(taskInfo);

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  const username = await userService.queryUsers({ id: result.uId });
  const dicValue = await dicService.queryDicByID(result.taskType);

  if (!username || !dicValue) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  result.username = username.rows[0].nickname;
  result.dicValue = dicValue.value;

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '添加成功',
    data: result,
  };
});

/**
 * 查询任务
 */
router.get('/', async (ctx) => {
  const { id, title, username } = ctx.query;
  let { page = 1, pageCount = config.pageCount } = ctx.query;
  const taskInfo = {
    id,
    title,
    username,
    isActive: 1,
  };

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

  const result = await taskService.queryTasks(taskInfo, [], page, pageCount);

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  ctx.status = 200;
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

/**
 * 删除任务
 */
router.delete('/:id', async (ctx) => {
  let { id } = ctx.params;

  id = _.toNumber(id);

  if (id < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: 'id 错误！',
    };
    return;
  }

  let result = await taskService.queryTasks({ id });

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '任务不存在',
    };
    return;
  }

  const uId = _.toNumber(result.rows[0].uId);

  if (uId !== ctx.token.id) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }

  [result] = result.rows;

  if (!_.toNumber(result.isActive)) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '删除成功!',
    };
    return;
  }

  // 如果任务状态是非可删除状态则拒绝请求
  if (result.status === taskStatusConfig.PENDING || result.status === taskStatusConfig.FULFILLED) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前状态下不可删除',
    };
    return;
  }

  result = await taskService.updateTask({ id, isActive: 0 });

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误！',
    };
    return;
  }

  ctx.status = 200;
  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '删除成功！',
  };
});

/**
 * 修改任务
 */
router.put('/:id', async (ctx) => {
  let { id } = ctx.params;
  const uId = ctx.token.id;
  const {
    title,
    taskType,
    content,
    memberCount,
    time,
    address,
  } = ctx.request.body;
  const taskInfo = {
    title,
    taskType,
    content,
    memberCount,
    time,
    address,
  };

  id = _.toNumber(id);

  if (dv.isParamsInvalid({ id }) || id < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: 'id 值错误',
    };
    return;
  }

  taskInfo.id = id;

  let result = await taskService.queryTasks({ id, isActive: 1 });

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
      msg: '任务不存在',
    };
    return;
  }

  [result] = result.rows;

  if (result.uId !== uId) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }

  if (result.status !== taskStatusConfig.PENDING) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前状态下不能更改',
    };
    return;
  }

  if (taskInfo.taskType > 0) {
    result = await dicService.queryDicByID(taskInfo.taskType);

    if (!result || result.count < 1) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        isSuccess: false,
        msg: '修改失败，任务类型不存在',
      };
      return;
    }
  }

  result = await taskService.updateTask(taskInfo);

  if (result === false) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '修改失败，系统错误',
    };
    return;
  }

  ctx.body = {
    status: 200,
    isSuccess: true,
    msg: '修改成功',
  };
});

router.put('/cancel/:id', async (ctx) => {
  const tId = ctx.params.id;

  if (Number.isNaN(tId) || tId < 1) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: 'id 错误',
    };
    return;
  }

  let result = await taskService.queryTasks({ id: tId, isActive: 1 });

  if (!result) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '系统错误',
    };
    return;
  }

  [result] = result.rows;

  if (result.uId !== ctx.token.id) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '没有权限',
    };
    return;
  }

  if (result.status === taskStatusConfig.SUCCESS) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      isSuccess: false,
      msg: '当前任务状态不可取消',
    };
    return;
  }

  result = await taskService.updateTask({ id: tId, status: taskStatusConfig.CANCELED });

  if (result !== false) {
    result = await taskUserService.updateTaskUser(
      { status: taskUserStatusConfig.BECANCELED },
      { tId },
    );

    if (result !== false) {
      ctx.body = {
        status: 200,
        isSuccess: true,
        msg: '修改成功',
      };
      return;
    }
  }

  ctx.status = 400;
  ctx.body = {
    status: 400,
    isSuccess: false,
    msg: '系统错误',
  };
});

module.exports = router;
