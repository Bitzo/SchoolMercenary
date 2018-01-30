const Sequelize = require('sequelize');
const sequelize = require('../db');
const users = require('./userModel');
const tasks = require('./tasksModle');

const taskUsers = sequelize.define('taskUser', {
  tId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
  uId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  acceptedTime: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
}, {
  tableName: 'taskUsers',
});

taskUsers.belongsTo(users, {
  foreignKey: 'uId',
  targetKet: 'id',
});

taskUsers.belongsTo(tasks, {
  foreignKey: 'tId',
  targetKet: 'id',
});

module.exports = taskUsers;