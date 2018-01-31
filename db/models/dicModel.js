const Sequelize = require('sequelize');
const sequelize = require('../db');
const moment = require('moment');

const dictionary = sequelize.define('dictionary', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  level: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    defaultValue: '1',
  },
  category: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,
  },
  value: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  createTime: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      const date = this.getDataValue('createTime');
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  parent: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
  },
  isActive: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    defaultValue: '1',
  },
}, {
  createdAt: 'createTime',
  updatedAt: false,
  tableName: 'dictionary',
});

module.exports = dictionary;
