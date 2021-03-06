/**
 * 检查参数是否是无效的（含有null、undefined、''）
 * @param {object} p 参数对象
 * @return {Boolean} 无效的返回key值，全有效返回false
 */
function isParamsInvalid(p) {
  for (const key in p) {
    if (p[key] === null || p[key] === '' || p[key] === undefined) {
      return key;
    }
  }
  return false;
}

/**
 * 检查参数是否是有效的（不含有null、undefined、''）
 * @param {object} p 参数对象
 * @return {Boolean} 含有无效值返回false，全部有效返回true
 */
function isParamsValid(p) {
  for (const key in p) {
    if (p[key] === null || p[key] === '' || p[key] === undefined) {
      return false;
    }
  }
  return true;
}

/**
 * 检查手机号的有效性
 * @param  {string}  phoneNumber 手机号
 * @return {Boolean} 手机号有效返回true
 */
function isPoneAvailable(phoneNumber) {
  const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(phoneNumber)) {
    return false;
  }
  return true;
}

module.exports = {
  isParamsInvalid,
  isParamsValid,
  isPoneAvailable,
};
