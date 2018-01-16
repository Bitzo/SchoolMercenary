const Sequelize = require('sequelize');
const sequelize = require('../db');

const user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(30),
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: Sequelize.STRING(11),
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  key: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING(100),
    allowNull: false,
    defaultValue: '/img/avatar.jpg',
  },
  gender: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: 1,
    get() {
      return this.getDataValue('gender') ? '男' : '女';
    },
    set(gender) {
      let g = gender;
      if (gender === '男' || gender === '女') {
        g = (gender === '男') ? 1 : 0;
      }
      this.setDataValue('gender', g);
    },
  },
  birthday: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  desc: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  love: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  hate: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  createTime: {
    type: Sequelize.DATE,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  createdAt: 'createTime',
  updatedAt: false,
});

module.exports = user;
