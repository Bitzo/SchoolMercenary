# 用户表: 存储用户的个人信息
create table `users` (
  `id` int not null primary key auto_increment,
  `username` varchar(20) not null unique, # 即账号(account), 不可更改, 全局唯一
  `nickname` varchar(20) not null, # 昵称, 可更改, 公开展示的名称
  `email` varchar(30),
  `phoneNumber` char(11),
  `password` varchar(100) not null, # 密码, 加密
  `key` varchar(100) not null, # 加密密码时所产生的random salt
  `avatar` varchar(100) not null default '/img/avatar.jpg', # 默认头像存储地址待定.(或者时直接写在配置里, 当此字段为空时读配置文件进行补全)
  `gender` tinyint(1) default 1, # 1男0女
  `birthday` datetime,
  `desc` varchar(100), # 个性签名
  `role` tinyint(1) not null default 0, # 角色, 普通用户0, 后台管理员1
  `love` int not null default 0, # 被赞数
  `hate` int not null default 0, # 被差评数
  `createTime` datetime not null,
  `isActive` tinyint(1) not null default 1
);

# 字典表: 存储字典数据
create table `dictionary` (
  `id` int not null primary key auto_increment,
  `level` tinyint not null default 1, # 层级, 由1开始计数
  `category` varchar(10) not null, # 字典表分类
  `code` varchar(20) not null unique, # 字典代码
  `value` varchar(20) not null, # 字典值
  `createTime` datetime not null,
  `parent` int not null,
  `isActive` tinyint(1) not null default 1,
  `origin_ids` varchar(255) not null,
  `origin_codes` varchar(255) not null
);

# 任务表: 存储所有发布的任务
create table `tasks` (
  `id` int not null primary key auto_increment,
  `uId` int not null, # 创建该任务的用户id
  `title` varchar(50) not null,
  `taskType` varchar(20) not null,
  `content` varchar(200), # 200字, 即只能满足文本格式, 若富文本或md则需要考虑扩增字数
  `menberCount` int not null default 1, # 任务需要人数
  `time` datetime not null, # 任务执行的时间
  `count` int not null default 0, # 任务已招募到的人数
  `address` varchar(100) not null, # 任务执行的地点
  `status` tinyint(1) not null default 0, # 任务状态见statusConfig
  `isActive` tinyint(1) not null default 1,
  `createTime` datetime not null,
  `editTime` datetime not null,
  FOREIGN KEY (taskType) REFERENCES dictionary(code)
);

# 任务用户表: 存储任务与招募用户的关系
create table `taskUsers` (
  `id` int primary not null auto_increment,
  `tId` int not null, # 任务id
  `uId` int not null, # 接受任务的用户id
  `createTime` datetime not null,
  `acceptedTime` datetime, # 被成功招募的时间
  `status` tinyint(1) not null default 0, # 任务用户状态 见statusConfig
  `isActive` tinyint(1) not null default 1,
  FOREIGN KEY (tId) REFERENCES tasks(id),
  FOREIGN KEY (uId) REFERENCES users(id)
);

# 评价表: 存储用户对曾经任务的评价
create table `evaluate` (
  `id` int not null primary key auto_increment,
  `taskUserId` int not null,
  `taskId` int not null, # 任务id
  `userId` int not null, # 用户id
  `level` int not null, # 评价等级 5级
  `content` varchar(100),
  `createTime` datetime not null,
  FOREIGN KEY (taskUserId) REFERENCES taskUsers(id),
  CHECK (level>=0 and level<=5)
);

# 消息表: 存储系统发送的公布/消息
create table `message` (
  `id` int not null primary key auto_increment,
  `title` varchar(50) not null,
  `content` varchar(200) not null,
  `uId` int not null,
  `status` tinyint(1) not null default 0, # 消息状态
  `createTime` datetime not null,
  FOREIGN KEY (uId) REFERENCES users(id)
);

# 聊天记录表: 仅存储离线消息, 当用户上线后将离线消息发送后即清空
create table `chatMsg` (
  `id` int not null primary key auto_increment,
  `sendTime` datetime not null,
  `content` varchar(200) not null,
  `fId` int not null,
  `tId` int not null,
  `isRead` tinyint default 0,
  FOREIGN KEY (fId) REFERENCES users(id),
  FOREIGN KEY (tId) REFERENCES users(id)
);
