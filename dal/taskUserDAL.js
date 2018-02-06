const TaskUser = require('../db/models/taskUserModel');
const Sequelize = require('sequelize');
const config = require('../config/config');
const User = require('../db/models/userModel');
const Task = require('../db/models/tasksModle');

const { Op } = Sequelize;

/**
 * 新增任务用户
 */
async function addTaskUser(info) {
  try {
    let result = await TaskUser.create(info);
    console.log(`Create TaskUser : ${result}`);
    result = JSON.parse(JSON.stringify(result));
    return result;
  } catch (e) {
    console.log(`Create TaskUser Failed : ${e}`);
    return false;
  }
}

/**
 * 查询任务用户
 * @param {Object} andParam
 * @param {Array} orParam
 * @param {number=} page 页码
 * @param {number=} pageCount 每页显示的数量
 */
async function queryTaskUser(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
  try {
    let results = [];
    if (orParam.length === 0) {
      results = await TaskUser.findAndCountAll({
        where: {
          [Op.and]: andParam,
        },
        include: [
          {
            model: User,
            attributes: ['nickname', 'avatar', 'gender', 'love', 'hate'],
            required: true,
          },
          {
            model: Task,
            attributes: ['title', 'content', 'time', 'address'],
            require: true,
          },
        ],
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    } else {
      results = await TaskUser.findAndCountAll({
        where: {
          [Op.and]: andParam,
          [Op.or]: orParam,
        },
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    }

    results = JSON.parse(JSON.stringify(results));
    return results;
  } catch (err) {
    console.log(`Query TaskUsers Error: ${err}`);
    return false;
  }
}

/**
 * 更新任务用户数据
 */
async function updateTaskUser(info, index) {
  try {
    let result = await TaskUser.update(
      info,
      {
        where: index,
      },
    );
    [result] = result;
    return result;
  } catch (err) {
    console.log(`Update TaskUser Error: ${err}`);
    return false;
  }
}


/**
 * DAL_deleteTask
 * @api 删除任务用户
 * @param {number} uId
 * @param {number} tId
 */
async function deleteTaskUser(uId, tId) {
  try {
    let result = await TaskUser.update(
      { isActive: 0 },
      {
        where: {
          uId,
          tId,
        },
      },
    );
    [result] = result;
    return result;
  } catch (err) {
    console.log(`Delete TaskUser Error: ${err}`);
    return false;
  }
}

module.exports = {
  addTaskUser,
  queryTaskUser,
  updateTaskUser,
  deleteTaskUser,
};
