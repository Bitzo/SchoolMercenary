const taskDAL = require('../dal/taskDAL');
const config = require('../config/config');
const dv = require('../utils/dataValidator');
const _ = require('lodash');

/**
 * service_queryTasks
 * @param {Object} taskInfo
 * @param {number} taskInfo.id
 * @param {number} taskInfo.uId
 * @param {string} taskInfo.title
 * @param {number} taskInfo.taskType
 * @param {string} taskInfo.content
 * @param {number=1} taskInfo.memberCount
 * @param {number=0} taskInfo.count
 * @param {string} taskInfo.address
 * @param {date} taskInfo.time
 * @param {string} taskInfo.address
 */
async function queryTasks(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
  const and = {};
  let or = [];
  _.forIn(andParam, (value, key) => {
    if (dv.isParamsValid({ value })) {
      and[key] = value;
    }
  });
  if (orParam.length > 0) {
    or = orParam;
  }
  try {
    return await taskDAL.queryTasks(and, or, page, pageCount);
  } catch (err) {
    console.log(`Query Tasks Failed: ${err}`);
    return false;
  }
}

/**
 * service_addTask
 * @param {Object} taskInfo
 * @param {number} taskInfo.uId
 * @param {string} taskInfo.title
 * @param {number} taskInfo.taskType
 * @param {string} taskInfo.content
 * @param {number=1} taskInfo.memberCount
 * @param {number=0} taskInfo.count
 * @param {string} taskInfo.address
 * @param {date} taskInfo.time
 * @param {string} taskInfo.address
 * @return {boolean|object} 新增成功返回插入的数据基本信息
 *                          失败则返回false
 */
async function addTask(taskInfo) {
  const info = {};
  _.forIn(taskInfo, (value, key) => {
    if (dv.isParamsValid({ value })) {
      info[key] = value;
    }
  });
  try {
    return await taskDAL.addTask(taskInfo);
  } catch (err) {
    console.log(`Add Task Failed: ${err}`);
    return false;
  }
}

/**
 * service_updateTask
 * @param {object} taskInfo
 * @param {number=} taskInfo.id
 * @param {number} taskInfo.uId
 * @param {string} taskInfo.title
 * @param {number} taskInfo.taskType
 * @param {string} taskInfo.content
 * @param {number=1} taskInfo.memberCount
 * @param {number=0} taskInfo.count
 * @param {string} taskInfo.address
 * @param {date} taskInfo.time
 * @param {string} taskInfo.address
 *
 * @return {boolean|array} 更新成功返回对象数组，查询失败则返回false
 */
async function updateTask(taskInfo) {
  const info = {};
  _.forIn(taskInfo, (value, key) => {
    if (dv.isParamsValid({ value })) {
      info[key] = value;
    }
  });
  try {
    return await taskDAL.updateTask(info);
  } catch (err) {
    console.log(`Update Task Failed: ${err}`);
    return false;
  }
}

/**
 * service_deleteTask
 * @param {number} id
 */
async function deleteTask(id) {
  try {
    const result = await taskDAL.deleteTask(id);
    return result;
  } catch (err) {
    console.log(`Delete Task Failed: ${err}`);
    return false;
  }
}

module.exports = {
  queryTasks,
  addTask,
  updateTask,
  deleteTask,
};
