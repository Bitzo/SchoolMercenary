const config = {
  taskStatus: {
    PENDING: 0, // 任务已发布，正在招募人员
    FULFILLED: 1, // 任务发布且已招齐人员
    SUCCESS: 2, // 任务已发布且任务已完成
  },
  taskUserStatus: {
    PENDING: 0, // 已报名某任务，但任务发布者还未回应
    ACCEPTED: 1, // 已报名某任务，且任务发布者已同意申请
    REJECTED: 2, // 已报名某任务，但任务发布者已拒绝申请
  },
};

module.exports = config;
