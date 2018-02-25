/**
 * updateUserProfile
 * @function 更新用户资料
 * @desc 主要更新用户的好评数、差评书
 */

const evaluateService = require('../evaluateService');
const userService = require('../userService');
const _ = require('lodash');

/**
 * 更新用户资料
 * @param  {Number} uId 用户ID
 */
async function updateUserProfile(uId) {
  const userId = _.toNumber(uId);

  if (Number.isNaN(userId)) {
    // TODO: 等待日志服务完成后记录错误日志
    return false;
  }

  let result = evaluateService.queryEvaluate({ userId });

  if (result === false) {
    return false;
  }

  result = result.rows;

  let love = 0;
  let hate = 0;

  result.map((v) => {
    if (v.level >= 3) love += 1;
    else hate += 1;
    return v;
  });

  result = await userService.updateUser({ userId, love, hate });

  if (result === false) {
    return false;
  }

  return true;
}

module.exports = {
  updateUserProfile,
};
