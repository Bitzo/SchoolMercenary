const Sequelize = require('sequelize');
const sequelize = require('../db');
const taskUser = require('./taskUserModel');
const moment = require('moment');
const User = require('./userModel');
const Task = require('./tasksModle');

const evulate = sequelize.define('evulate', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  taskUserId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'taskUsers',
      key: 'id',
    },
  },
  taskId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  level: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  content: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  createTime: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    get() {
      const date = this.getDataValue('createTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}, {
  createdAt: 'createTime',
  updatedAt: false,
  tableName: 'evulate',
});

evulate.belongsTo(taskUser, {
  foreignKey: 'taskUserId',
  targetKet: 'id',
});

evulate.belongsTo(Task, {
  foreignKey: 'taskId',
  targetKet: 'id',
});

evulate.belongsTo(User, {
  foreignKey: 'UserId',
  targetKet: 'id',
});

module.exports = evulate;
