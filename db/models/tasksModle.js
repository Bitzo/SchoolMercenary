const Sequelize = require('sequelize');
const sequelize = require('../db');
const user = require('./userModel');
const dictionary = require('./dicModel');
const moment = require('moment');

const task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  uId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  taskType: {
    type: Sequelize.STRING(20),
    allowNull: false,
    references: {
      model: 'dictionary',
      key: 'id',
    },
  },
  content: {
    type: Sequelize.STRING(200),
    allowNull: true,
  },
  menberCount: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: '1',
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      const date = this.getDataValue('time');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  count: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    defaultValue: '0',
  },
  address: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: '0',
  },
  createTime: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    get() {
      const date = this.getDataValue('createTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  editTime: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    get() {
      const date = this.getDataValue('editTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}, {
  tableName: 'tasks',
  createdAt: 'createTime',
  updatedAt: 'editTime',
});

task.belongsTo(user, {
  foreignKey: 'uId',
  targetKet: 'id',
});

task.belongsTo(dictionary, {
  foreignKey: 'tackType',
  targetKet: 'id',
});

module.exports = task;
