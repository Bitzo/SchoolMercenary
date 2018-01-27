const Router = require('koa-router');
const taskService = require('../../service/taskService');
const dv = require('../../utils/dataValidator');
const moment = require('moment');
const _ = require('lodash');
const userService = require('../../service/userService');
const dicService = require('../../service/dicService');

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

  const now = moment().format();

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

module.exports = router;
