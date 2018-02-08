const evaluateDAL = require('../dal/evaluateDAL');
const config = require('../config/config');
const dv = require('../utils/dataValidator');
const _ = require('lodash');

/**
 * service_queryEvaluate
 * @param {Object} evaluateInfo
 */
async function queryEvaluate(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
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
    return await evaluateDAL.queryEvaluate(and, or, page, pageCount);
  } catch (err) {
    console.log(`Query Evaluate Failed: ${err}`);
    return false;
  }
}

/**
 * service_addEvaluate
 * @param {Object} evaluateInfo
 * @return {boolean|object} 新增成功返回插入的数据基本信息
 *                          失败则返回false
 */
async function addEvaluate(evaluateInfo) {
  const info = {};
  _.forIn(evaluateInfo, (value, key) => {
    if (dv.isParamsValid({ value })) {
      info[key] = value;
    }
  });
  try {
    return await evaluateDAL.addEvaluate(evaluateInfo);
  } catch (err) {
    console.log(`Add Evaluate Failed: ${err}`);
    return false;
  }
}

module.exports = {
  queryEvaluate,
  addEvaluate,
};
