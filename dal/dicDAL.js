const Dictionary = require('../db/models/dicModel');

/**
 * 查询字典数据
 * @param  {Object} param
 * @return {boolean|object}
 */
async function queryDic(param) {
  try {
    let result = await Dictionary.findAndCountAll({
      where: param,
    });
    result = JSON.parse(JSON.stringify(result));
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}

/**
 * 根据ID查询字典数据
 * @param  {Integer} id
 * @return {boolean|object}
 */
async function queryDicByID(id) {
  try {
    let result = await Dictionary.findById(id);
    result = JSON.parse(JSON.stringify(result));
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  queryDic,
  queryDicByID,
};
