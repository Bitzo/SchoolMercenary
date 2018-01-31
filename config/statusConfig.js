/**
 * 状态配置
 * @property {object} taskStatus
 * @property {object} taskUserStatus
 */
const config = {
  taskStatus: {
    PENDING: 0, // 任务已发布，正在招募人员
    FULFILLED: 1, // 任务发布且已招齐人员
    SUCCESS: 2, // 任务已发布且任务已完成
    CANCELED: 3, // 用户自行取消
  },
  taskUserStatus: {
    PENDING: 0, // 已报名某任务，但任务发布者还未回应
    ACCEPTED: 1, // 已报名某任务，且任务发布者已同意申请
    REJECTED: 2, // 已报名某任务，但任务发布者已拒绝申请
    CANCELED: 3, // 用户自行取消，在除PENDING状态外不能转换到此状态
    BECANCELED: 4, // 被取消，当task的状态被改为CANCELED，改变成此状态
  },
};

module.exports = config;
