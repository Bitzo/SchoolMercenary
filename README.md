# 校园佣兵

## 接口文档: [https://api.bitzo.cn](https://api.bitzo.cn)

## 目录

- [后端接口-移动端API](#后端接口-移动端api)
  - [用户API](#用户api)
  - [消息通知API](#消息通知api)
  - [任务API](#任务api)
  - [任务用户API](#任务用户api)
  - [评价任务API](#评价任务api)
- [需要完成的自动任务](#需要完成的自动任务)

## 后端接口-移动端API

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
| 4 | PUT | /api/tasks/cancel/:id | 取消任务  |
| 5 | DELETE | /api/tasks/:id | 删除任务 |
| 6 | PUT | /api/tasks/finish/:id | 完成任务 |

### 任务用户API

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | POST | /api/taskuser | 申请任务 |
| 2 | PUT | /api/taskuser/cancel/:tId | 取消任务申请 |
| 3 | PUT | /api/taskuser/:tId/:uId | 审核申请 |
| 4 | GET | /api/taskuser | 查询任务用户，用户任务历史 |

### 评价任务API

| 序号 | 方法 | 接口 | 备注 |
|:-:|:--:|:--|:---|
| 1 | POST | /api/evaluate | 评价参与过的任务 |
| 2 | GET | /api/evaluate  | 查询评价信息 |
| ~~3~~ | ~~PUT~~ | ~~/api/evaluate/:userId~~ | ~~评价用户~~ |

## 需要完成的自动任务

| 序号 | 任务 | 描述 | 备注 |
|:-:|:--:|:--|:---|
| 1 |   |   |   |
