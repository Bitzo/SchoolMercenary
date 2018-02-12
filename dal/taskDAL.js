const Sequelize = require('sequelize');
const _ = require('lodash');
const Task = require('../db/models/tasksModle');
const config = require('../config/config');
const User = require('../db/models/userModel');
const dictionary = require('../db/models/dicModel');

const { Op } = Sequelize;

/**
 * DAL_addTask
 * @api 添加任务
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
 */
async function addTask(taskInfo) {
  try {
    let task = await Task.create(taskInfo);
    console.log(`Create Task : ${JSON.stringify(task)}`);
    task = JSON.parse(JSON.stringify(task));
    _.omit(task, ['isActive']);
    return task;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * DAL_queryTasks
 * @api 查询任务
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
 * @param {number=} page 页码
 * @param {number=} pageCount 每页显示的数量
 */
async function queryTasks(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
  try {
    let tasks = [];
    if (orParam.length === 0) {
      tasks = await Task.findAndCountAll({
        where: {
          [Op.and]: andParam,
        },
        include: [
          {
            model: User,
            attributes: ['nickname'],
            required: true,
          },
          {
            model: dictionary,
            attributes: ['value'],
            require: true,
          },
        ],
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    } else {
      tasks = await Task.findAndCountAll({
        where: {
          [Op.and]: andParam,
          [Op.or]: orParam,
        },
        offset: (page - 1) * pageCount,
        limit: pageCount,
        include: [
          {
            model: User,
            attributes: ['nickname'],
            required: true,
          },
          {
            model: dictionary,
            attributes: ['value'],
            require: true,
          },
        ],
      });
    }
    tasks = JSON.parse(JSON.stringify(tasks));
    const rows = tasks.rows.map((item) => {
      let temp = item;
      temp.username = item.user.nickname;
      temp.dicValue = item.dictionary.value;
      temp = _.omit(temp, ['user', 'dictionary']);
      return temp;
    });
    tasks.rows = rows;
    return tasks;
  } catch (err) {
    console.log(`Query Tasks Error: ${err}`);
    return false;
  }
}

/**
 * DAL_updateTask
 * @api 修改任务
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
async function updateTask(taskInfo) {
  try {
    let result = await Task.update(
      _.omit(taskInfo, 'id'),
      {
        where: {
          id: taskInfo.id,
        },
      },
    );
    [result] = result;
    return result;
  } catch (err) {
    console.log(`Update Task Error: ${err}`);
    return false;
  }
}

/**
 * DAL_deleteTask
 * @api 删除任务
 * @param {number} id
 */
async function deleteTask(id) {
  try {
    let result = await Task.update(
      { isActive: 0 },
      {
        where: {
          id,
        },
      },
    );
    [result] = result;
    return result;
  } catch (err) {
    console.log(`Delete Task Error: ${err}`);
    return false;
  }
}

module.exports = {
  addTask,
  queryTasks,
  updateTask,
  deleteTask,
};
