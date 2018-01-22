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
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  uId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: 0,
  },
  createTime: {
    type: Sequelize.DATE,
    allowNull: false,
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
