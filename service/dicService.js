const _ = require('lodash');
const dicDAL = require('../dal/dicDAL');
const dv = require('../utils/dataValidator');

/**
 * service_queryDictionary
 * @param {object} param
 * @return {boolean|array} 查询成功返回对象数组，查询失败则返回false
 */
async function queryDic(param) {
  try {
    const info = {};
    _.forIn(param, (value, key) => {
      if (dv.isParamsValid({ value })) {
        info[key] = value;
      }
    });
    return await dicDAL.queryDic(info);
  } catch (err) {
    console.log(`Query Dic Failed: ${err}`);
    return false;
  }
}

async function queryDicByID(id) {
  if (dv.isParamsInvalid({ id })) {
    return false;
  }

  try {
    return await dicDAL.queryDicByID(id);
  } catch (err) {
    console.log(`Query Dic Failed: ${err}`);
    return false;
  }
}

module.exports = {
  queryDic,
  queryDicByID,
};
