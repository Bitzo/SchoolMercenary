const Sequelize = require('sequelize');
const sequelize = require('../db');
const user = require('./userModel');
const dictionary = require('./dicModel');

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
    type: Sequelize.DATEONLY,
    allowNull: false,
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
  },
  editTime: {
    type: Sequelize.DATEONLY,
    allowNull: false,
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
