const taskUserDAL = require('../dal/taskUserDAL');
const config = require('../config/config');
const dv = require('../utils/dataValidator');
const _ = require('lodash');

/**
 * service_queryTaskUser
 */
async function queryTaskUser(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
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
    return await taskUserDAL.queryTaskUser(and, or, page, pageCount);
  } catch (err) {
    console.log(`Query TaskUsers Failed: ${err}`);
    return false;
  }
}

/**
 * service_addTaskUser
 */
async function addTaskUser(taskInfo) {
  const info = {};
  _.forIn(taskInfo, (value, key) => {
    if (dv.isParamsValid({ value })) {
      info[key] = value;
    }
  });
  try {
    return await taskUserDAL.addTaskUser(taskInfo);
  } catch (err) {
    console.log(`Add TaskUser Failed: ${err}`);
    return false;
  }
}

/**
 * service_updateTaskUser
 */
async function updateTaskUser(taskInfo, index) {
  const info = {};
  _.forIn(taskInfo, (value, key) => {
    if (dv.isParamsValid({ value })) {
      info[key] = value;
    }
  });
  try {
    return await taskUserDAL.updateTaskUser(info, index);
  } catch (err) {
    console.log(`Update TaskUser Failed: ${err}`);
    return false;
  }
}

/**
 * service_deleteTaskUser
 * @param {number} id
 */
async function deleteTaskUser(id) {
  try {
    const result = await taskUserDAL.deleteTaskUser(id);
    return result;
  } catch (err) {
    console.log(`Delete TaskUser Failed: ${err}`);
    return false;
  }
}

module.exports = {
  queryTaskUser,
  addTaskUser,
  updateTaskUser,
  deleteTaskUser,
};
