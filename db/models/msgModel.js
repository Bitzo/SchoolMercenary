const Sequelize = require('sequelize');
const sequelize = require('../db');
const user = require('./userModel');

const message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  uId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  createTime: {
    type: Sequelize.DATE,
  },
}, {
  createdAt: 'createTime',
  updatedAt: false,
  tableName: 'message',
});

message.belongsTo(user, {
  foreignKey: 'uId',
  targetKet: 'id',
});

module.exports = message;
