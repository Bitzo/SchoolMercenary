# 校园佣兵

## 后端接口-移动端API

### 接口文档: [https://api.bitzo.cn](https://api.bitzo.cn)

### 用户API

#### 登录注册

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | POST | /api/register/normal | 用户注册（常规） |
| 2 | POST | /api/register/phoneCode | 获取验证码 |
| 3 | POST | /api/register/phone | 手机注册 |
| 4 | POST | /api/login | 用户登录 |

#### 用户信息

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | GET | /api/users | 用户信息查询 |
| 2 | PUT | /api/users/:id | 用户基本信息修改 |
| 3 | PUT | /api/users/avatar/:id | 修改头像 |
| 4 | PUT | /api/users/password/:id | 修改密码 |

### 消息通知API

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | GET | /api/messages | 查询通知 |

### 任务API

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | POST | /api/tasks | 新增任务 |
| 2 | GET | /api/tasks | 查询任务 |
| 3 | PUT | /api/tasks/:id | 修改任务 |
| 4 | DELETE | /api/tasks/:id | 删除任务 |

### 任务用户API

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | POST | /api/taskuser | 申请任务 |
| 2 | PUT | /api/taskuser/cancel/:tId | 取消任务申请 |
