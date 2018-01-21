const _ = require('lodash');
const dv = require('../utils/dataValidator');
const msgDal = require('../dal/messageDAL');
const config = require('../config/config');
/**
 * service_queryUsers
 * @param {object} andParam
 * @param {Array} orParam
 * @param {Integer=} page
 * @param {Integer=} pageCount
 *
 * @return {boolean|array} 查询成功返回对象数组，查询失败则返回false
 */
async function queryMessages(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
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
    return await msgDal.queryMsg(and, or, page, pageCount);
  } catch (err) {
    console.log(`Query Msg Failed: ${err}`);
    return false;
  }
}

module.exports = {
  queryMessages,
};
