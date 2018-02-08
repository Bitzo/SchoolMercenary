const Sequelize = require('sequelize');
const Evaluate = require('../db/models/evaluateModel');
const config = require('../config/config');
const Task = require('../db/models/tasksModle');
const User = require('../db/models/userModel');

const { Op } = Sequelize;

/**
 * DAL_addEvaluate
 * @api 添加评价信息
 * @param {Object} evaluateInfo
 * @param {number} evaluateInfo.taskUserId
 * @param {number} evaluateInfo.taskId
 * @param {number} evaluateInfo.userId
 * @param {number} evaluateInfo.level
 * @param {string} evaluateInfo.content
 */
async function addEvaluate(evaluateInfo) {
  try {
    let evaluate = await Evaluate.create(evaluateInfo);
    console.log(`Create Evaluate : ${JSON.stringify(evaluate)}`);
    evaluate = JSON.parse(JSON.stringify(evaluate));
    return evaluate;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * DAL_queryEvaluates
 * @api 查询评价
 * @param {number=} page 页码
 * @param {number=} pageCount 每页显示的数量
 */
async function queryEvaluates(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
  try {
    let evaluate = [];
    if (orParam.length === 0) {
      evaluate = await Evaluate.findAndCountAll({
        where: {
          [Op.and]: andParam,
        },
        include: [
          {
            model: Task,
            attributes: ['id', 'title', 'content', 'time', 'address', 'status'],
            required: true,
          },
          {
            model: User,
            attributes: ['id', 'nickname', 'avatar'],
            required: true,
          },
        ],
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    } else {
      evaluate = await Evaluate.findAndCountAll({
        where: {
          [Op.and]: andParam,
          [Op.or]: orParam,
        },
        include: [
          {
            model: Task,
            attributes: ['id', 'title', 'content', 'time', 'address', 'status'],
            required: true,
          },
          {
            model: User,
            attributes: ['id', 'nickname', 'avatar'],
            required: true,
          },
        ],
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    }
    evaluate = JSON.parse(JSON.stringify(evaluate));
    return evaluate;
  } catch (err) {
    console.log(`Query Evaluates Error: ${err}`);
    return false;
  }
}

module.exports = {
  addEvaluate,
  queryEvaluates,
};
