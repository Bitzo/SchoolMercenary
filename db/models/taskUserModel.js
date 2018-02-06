const Sequelize = require('sequelize');
const sequelize = require('../db');
const users = require('./userModel');
const tasks = require('./tasksModle');
const moment = require('moment');

const taskUsers = sequelize.define('taskUser', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
  uId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createTime: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      const date = this.getDataValue('createTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  acceptedTime: {
    type: Sequelize.DATE,
    allowNull: true,
    get() {
      const date = this.getDataValue('acceptedTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
}, {
  tableName: 'taskUsers',
  createdAt: 'createTime',
  updatedAt: false,
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
