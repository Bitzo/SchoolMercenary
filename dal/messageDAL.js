const Sequelize = require('sequelize');
const config = require('../config/config');
const Message = require('../db/models/msgModel');
const Users = require('../db/models/userModel');

const { Op } = Sequelize;

/**
 * db_queryUsers
 * @param {Object=} andParam
 * @param {Array=} orParam
 * @param {Integer=} page
 * @param {Integer=} pageCount
 *
 * @return {boolean|array} 查询成功返回对象数组，查询失败则返回false
 */
async function queryMsg(andParam = {}, orParam = [], page = 1, pageCount = config.pageCount) {
  try {
    let messages = [];
    if (orParam.length === 0) {
      messages = await Message.findAndCountAll({
        where: {
          [Op.and]: andParam,
        },
        include: [
          {
            model: Users,
            required: true,
          },
        ],
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    } else {
      messages = await Message.findAndCountAll({
        where: {
          [Op.and]: andParam,
          [Op.or]: orParam,
        },
        offset: (page - 1) * pageCount,
        limit: pageCount,
      });
    }

    messages = JSON.parse(JSON.stringify(messages));
    return messages;
  } catch (err) {
    console.log(`Query Msg Error: ${err}`);
    return false;
  }
}

module.exports = {
  queryMsg,
};
