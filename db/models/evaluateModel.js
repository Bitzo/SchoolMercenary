const Sequelize = require('sequelize');
const sequelize = require('../db');
const taskUser = require('./taskUserModel');
const moment = require('moment');
const User = require('./userModel');
const Task = require('./tasksModle');

const evaluate = sequelize.define('evaluate', {
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
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      const date = this.getDataValue('createTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
}, {
  createdAt: 'createTime',
  updatedAt: false,
  tableName: 'evaluate',
});

evaluate.belongsTo(taskUser, {
  foreignKey: 'taskUserId',
  targetKet: 'id',
});

evaluate.belongsTo(Task, {
  foreignKey: 'taskId',
  targetKet: 'id',
});

evaluate.belongsTo(User, {
  foreignKey: 'userId',
  targetKet: 'id',
});

module.exports = evaluate;
