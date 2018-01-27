define({ "api": [
  {
    "type": "POST",
    "url": "/api/manage/login",
    "title": "*用户登录",
    "name": "Login",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "account",
            "description": "<p>登录帐号,可以是email/username/nickname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"token\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "PUT",
    "url": "/api/manage/dictionary/:ID",
    "title": "*字典修改",
    "name": "UpdateDictionary",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "level",
            "description": "<p>层级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "parent",
            "description": "<p>父级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...10",
            "optional": true,
            "field": "category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...20",
            "optional": true,
            "field": "code",
            "description": "<p>字典代码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": true,
            "field": "value",
            "description": "<p>字典值</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0,1",
            "optional": true,
            "field": "isActive",
            "description": "<p>是否有效</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "PUT",
    "url": "/api/manage/dictionary/status/:ID",
    "title": "*字典值关闭或启用",
    "name": "UpdateDictionaryStatus",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"data\": {\n     \"id\": 1223,\n     \"isActive\": 1 // 经过修改后的状态\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\",\n  \"data\": {\n     \"id\": 1223,\n     \"isActive\": 1 // 目前的状态\n  }\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "POST",
    "url": "/api/manage/dictionary",
    "title": "*字典增加",
    "name": "addDictionary",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "level",
            "defaultValue": "0",
            "description": "<p>层级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "parent",
            "defaultValue": "-1",
            "description": "<p>父级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...10",
            "optional": false,
            "field": "category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...20",
            "optional": false,
            "field": "code",
            "description": "<p>字典代码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": false,
            "field": "value",
            "description": "<p>字典值</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0,1",
            "optional": false,
            "field": "isActive",
            "description": "<p>是否有效</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "POST",
    "url": "/api/manage/message",
    "title": "*新增消息",
    "name": "addMsg",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "...50",
            "optional": false,
            "field": "title",
            "description": "<p>消息标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...200",
            "optional": false,
            "field": "content",
            "description": "<p>消息内容</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": ’添加成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\",\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "DELETE",
    "url": "/api/manage/message/:id",
    "title": "*删除消息",
    "name": "delMsg",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\",\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "GET",
    "url": "/api/manage/dictionary",
    "title": "*字典查询",
    "name": "queryDictionary",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "Id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "level",
            "description": "<p>层级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "parent",
            "description": "<p>父级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...10",
            "optional": true,
            "field": "category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...20",
            "optional": true,
            "field": "code",
            "description": "<p>字典代码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": true,
            "field": "value",
            "description": "<p>字典值</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createTime",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0,1",
            "optional": true,
            "field": "isActive",
            "description": "<p>是否有效</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"date\": [\n     {\n       \"id\": 1223,\n       \"level\": 0,\n       \"parent\": -1,\n       \"category\": \"country\",\n       \"code\": \"China\",\n       \"value\": \"中国\",\n       \"createTime\": \"2017-12-20 12:00\",\n       \"isActive\": 1,\n       \"sub\": [\n         {\n           \"id\": 1224,\n           \"level\": 1,\n           \"parent\": 1223,\n           \"category\": \"province\",\n           \"code\": \"JiangSu\",\n           \"value\": \"江苏省\",\n           \"createTime\": \"2017-12-20 12:00\",\n           \"isActive\": 1,\n           \"sub\": [\n              {\n                \"id\": 1225,\n                \"level\": 2,\n                \"parent\": 1224,\n                \"category\": \"city\",\n                \"code\": \"Nanjing\",\n                \"value\": \"南京市\",\n                \"createTime\": \"2017-12-20 12:00\",\n                \"isActive\": 1,\n              },\n              ...\n            ]\n         },\n         ...\n       ]\n     },\n     ...\n  ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "GET",
    "url": "/api/manage/message",
    "title": "*查询消息",
    "name": "queryMsg",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>消息Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...50",
            "optional": true,
            "field": "title",
            "description": "<p>消息标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...200",
            "optional": true,
            "field": "content",
            "description": "<p>消息内容</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "uId",
            "description": "<p>发布者Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>消息状态</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "startTime",
            "description": "<p>消息发布时间start</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "endTime",
            "description": "<p>消息发布时间end</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": {\n     \"id\": 1002,\n     \"title\": \"asdasdcsa\",\n     \"content\": \"asfdasdfasdsa\",\n     \"from\": \"admin\",\n     \"status\": \"发布\",\n     \"createTime\": \"2017-12-12 12:00\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\",\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "GET",
    "url": "/api/manage/tasks",
    "title": "*任务查询",
    "name": "queryTasks",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "taskType",
            "description": "<p>任务类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..50",
            "optional": true,
            "field": "title",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": true,
            "field": "username",
            "description": "<p>发布者</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createStartTime",
            "description": "<p>发布：开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "createEndTIme",
            "description": "<p>发布：结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "excuteStartTime",
            "description": "<p>执行：开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "excuteEndTIme",
            "description": "<p>执行：结束时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": true,
            "field": "address",
            "description": "<p>执行地点</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"date\": [\n     {\n       \"id\":1,\n       \"uId\": 10001,\n       \"title\": \"title\",\n       \"nickName\": \"bitzo\",\n       \"taskType\": \"type\",\n       \"memberCount\": 3,\n       \"count\": 2,\n       \"status\": \"招募中\",\n       \"time\": \"2017-12-20 20:00:00\",\n       \"address\": \"asdasdsa\",\n       \"createTime\": \"2017-12-20 20:00:00\",\n       \"editTime\": \"2017-12-20 20:00:00\"\n     },\n     ...\n  ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "GET",
    "url": "/api/manage/users",
    "title": "*用户查询",
    "name": "queryUsers",
    "group": "Backend",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..20",
            "optional": true,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..20",
            "optional": true,
            "field": "nickName",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "11",
            "optional": true,
            "field": "phoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..30",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": [\n   {\n     \"id\": 10001,\n     \"username\": \"bitzo\",\n     \"nickName\": \"bitzo\",\n     \"email\": \"bitzo@qq.com\",\n     \"phoneNumber\": \"12345678901\",\n     \"avatar\": \"/img/default.png\",\n     \"birthday\": 2017-9-1,\n     \"desc\": \"asdsadsadas\",\n     \"love\": 20,\n     \"hate\": 1\n   },\n   ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/BackendApi.js",
    "groupTitle": "Backend"
  },
  {
    "type": "GET",
    "url": "/api/dictionary",
    "title": "查询字典",
    "name": "QueryDictionary",
    "group": "Dictionary",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...10",
            "optional": true,
            "field": "category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>父级节点的id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"data\": [\n      {\n       \"id\": 1,\n       \"level\": 1,\n       \"category\": \"province\",\n       \"code\": \"JiangSu\",\n       \"value\": \"江苏省\",\n       \"createTime\": \"2018-01-22\",\n       \"parent\": 0,\n       \"isActive\": 1\n     },\n     {\n       \"id\": 2,\n       \"level\": 1,\n       \"category\": \"province\",\n       \"code\": \"ZheJiang\",\n       \"value\": \"浙江省\",\n       \"createTime\": \"2018-01-22\",\n       \"parent\": 0,\n       \"isActive\": 1\n     },\n     {\n       \"id\": 5,\n       \"level\": 1,\n       \"category\": \"province\",\n       \"code\": \"AnHui\",\n       \"value\": \"安徽省\",\n       \"createTime\": \"2018-01-22\",\n       \"parent\": 0,\n       \"isActive\": 1\n     },\n     ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/MessageApi.js",
    "groupTitle": "Dictionary"
  },
  {
    "type": "POST",
    "url": "/api/evaluate",
    "title": "*评价曾参与过的任务",
    "name": "EvaluateTask",
    "group": "Evaluate",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tId",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uId",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..5",
            "optional": false,
            "field": "level",
            "description": "<p>评价等级</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": true,
            "field": "content",
            "description": "<p>评价内容</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/EvaluateApi.js",
    "groupTitle": "Evaluate"
  },
  {
    "type": "PUT",
    "url": "/api/evaluate/:userId",
    "title": "评价用户",
    "name": "EvaluateUser",
    "group": "Evaluate",
    "version": "1.0.0",
    "deprecated": {
      "content": "暂时弃用此接口"
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1,0",
            "optional": false,
            "field": "status",
            "description": "<p>状态 1赞 0差评</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/EvaluateApi.js",
    "groupTitle": "Evaluate"
  },
  {
    "type": "GET",
    "url": "/api/evaluate",
    "title": "*查询评价信息",
    "name": "QueryEvaluate",
    "group": "Evaluate",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "tId",
            "description": "<p>任务Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1..5",
            "optional": true,
            "field": "level",
            "description": "<p>评价等级</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": [\n     {\n       \"id\":  11101,\n       \"tId\": 10212\n       \"uid\": 12153,\n       \"level\": 4,\n       \"content\": \"good\",\n       \"createTime0\": \"2017-12-21 12:00\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/EvaluateApi.js",
    "groupTitle": "Evaluate"
  },
  {
    "type": "GET",
    "url": "/api/message",
    "title": "查询通知",
    "name": "QueryMessages",
    "group": "Message",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "...50",
            "optional": true,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": [\n     {\n        \"id\": 1001,\n        \"title\": \"a message about ...\",\n        \"content\": \"bajdbakjdika\",\n        \"from\": \"admin\",\n        \"createTime\": \"2017-12-12 12:00\",\n     },\n     ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/MessageApi.js",
    "groupTitle": "Message"
  },
  {
    "type": "DELETE",
    "url": "/api/tasks/:id",
    "title": "*删除任务",
    "name": "DeleteTask",
    "group": "Task",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskApi.js",
    "groupTitle": "Task"
  },
  {
    "type": "POST",
    "url": "/api/tasks",
    "title": "发布任务",
    "name": "PostTask",
    "group": "Task",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..50",
            "optional": false,
            "field": "title",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": false,
            "field": "taskType",
            "description": "<p>任务类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..200",
            "optional": true,
            "field": "content",
            "description": "<p>任务详情</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "menberCount",
            "description": "<p>=1 任务需要的成员数量</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "time",
            "description": "<p>任务开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..100",
            "optional": false,
            "field": "address",
            "description": "<p>任务执行地点</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskApi.js",
    "groupTitle": "Task"
  },
  {
    "type": "GET",
    "url": "/api/tasks",
    "title": "*查询任务",
    "name": "QueryTasks",
    "group": "Task",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..50",
            "optional": true,
            "field": "title",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": true,
            "field": "username",
            "description": "<p>发布者</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"date\": [\n     {\n       \"id\":1,\n       \"uId\": 10001,\n       \"nickName\": \"bitzo\",\n       \"avatar\": \"/img/default.png\",\n       \"title\": \"title\",\n       \"taskType\": \"type\",\n       \"content\": \"adasdasd\",\n       \"memberCount\": 3,\n       \"time\": 2017-12-20 20:00:00,\n       \"address\": \"asdasdsa\"\n     },\n     ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskApi.js",
    "groupTitle": "Task"
  },
  {
    "type": "PUT",
    "url": "/api/tasks/:id",
    "title": "*修改任务",
    "name": "UpdateTask",
    "group": "Task",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..50",
            "optional": true,
            "field": "title",
            "description": "<p>任务名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": true,
            "field": "taskType",
            "description": "<p>任务类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..200",
            "optional": true,
            "field": "content",
            "description": "<p>任务详情</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "menberCount",
            "description": "<p>任务需要的成员数量</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "time",
            "description": "<p>任务开始时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..100",
            "optional": true,
            "field": "address",
            "description": "<p>任务执行低点</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskApi.js",
    "groupTitle": "Task"
  },
  {
    "type": "POST",
    "url": "/api/taskuser",
    "title": "*申请任务",
    "name": "ApplyTaskUsers",
    "group": "TaskUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tId",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "uId",
            "description": "<p>用户ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskUserApi.js",
    "groupTitle": "TaskUser"
  },
  {
    "type": "PUT",
    "url": "/api/taskuser/cancel/:tId",
    "title": "*取消任务申请",
    "name": "CancelTaskUsers",
    "group": "TaskUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskUserApi.js",
    "groupTitle": "TaskUser"
  },
  {
    "type": "PUT",
    "url": "/api/taskuser/:tId/:uId",
    "title": "*接受/拒绝任务申请",
    "name": "CheckTaskUsers",
    "group": "TaskUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "status",
            "description": "<p>结果，同意或不同意</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskUserApi.js",
    "groupTitle": "TaskUser"
  },
  {
    "type": "GET",
    "url": "/api/taskuser",
    "title": "*获取任务人员/人员任务信息/参与的任务历史记录",
    "name": "QueryTaskUsers",
    "group": "TaskUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "tId",
            "description": "<p>任务ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "uId",
            "description": "<p>用户ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0,1,2",
            "optional": true,
            "field": "status",
            "description": "<p>状态</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": [\n     {\n       \"tId\": 10001,\n       \"uId\": 10002,\n       \"createTime\": \"2017-9-10 10:10\" //请求时间\n       \"acceptedTime\": \"\", //回应时间\n       \"status\": 1, //状态\n     },\n     ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/TaskUserApi.js",
    "groupTitle": "TaskUser"
  },
  {
    "type": "GET",
    "url": "/api/users",
    "title": "查询用户信息",
    "name": "QueryUsersInfo",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..20",
            "optional": true,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..20",
            "optional": true,
            "field": "nickName",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..30",
            "optional": true,
            "field": "email",
            "description": "<p>邮箱</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "pageCount",
            "defaultValue": "20",
            "description": "<p>页量</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\",\n  \"page\": 1， //当前页码\n  \"pageCount\": 20, //当前每页数据量\n  \"totalPage\": 10, //总页数\n  \"data\": [\n   {\n     \"id\": 10001,\n     \"gender\": \"男\",\n     \"username\": \"bitzo\",\n     \"nickName\": \"bitzo\",\n     \"email\": \"bitzo@qq.com\",\n     \"phoneNumber\": \"12345678901\",\n     \"avatar\": \"/img/default.png\",\n     \"birthday\": 2017-9-1,\n     \"desc\": \"asdsadsadas\",\n     \"love\": 20,\n     \"hate\": 1\n   },\n   ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/api/users/avatar/:id",
    "title": "修改用户头像",
    "name": "UpdateUserAvatar",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "size": "<=2Mb,.jpg|.png|.jpeg",
            "optional": false,
            "field": "avatar",
            "description": "<p>头像image</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/api/users/password/:id",
    "title": "修改用户密码",
    "name": "UpdateUserPwd",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "...20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "PUT",
    "url": "/api/users/:id",
    "title": "修改用户信息",
    "name": "UpdateUserinfo",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "1..20",
            "optional": true,
            "field": "nickName",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "allowedValues": [
              "0",
              "1"
            ],
            "optional": true,
            "field": "gender",
            "description": "<p>性别 1男0女</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "birthday",
            "description": "<p>出生日期</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..100",
            "optional": true,
            "field": "desc",
            "description": "<p>个性签名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "HTTP/1.1 200 OK",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        },
        {
          "title": "Forbidden:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"status\": 403,\n  \"isSuccess\": false,\n  \"msg\": \"tokenError\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/login",
    "title": "用户登录",
    "name": "UserLogin",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "account",
            "description": "<p>登录帐号,可以是email/username/nickname/phoneNUmber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "..20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"token\": \"\",\n  \"userInfo\": {\n     \"id\": 22,\n     \"gender\": \"男\",\n     \"username\": \"bitzo\",\n     \"nickname\": \"asd\",\n     ...\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/register/normal",
    "title": "用户注册-常规注册法",
    "name": "UserRegister",
    "group": "User",
    "version": "1.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "5...30",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "5...30",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8...20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/register/normal",
    "title": "用户注册-常规注册法",
    "name": "UserRegister",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/register/phoneCode",
    "title": "用户注册-获取手机验证码",
    "name": "UserRegister_getPhoneCode",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "11",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/register/phone",
    "title": "用户注册-手机注册",
    "name": "UserRegister_phone",
    "group": "User",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "11",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "5...30",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "5...30",
            "optional": false,
            "field": "nickname",
            "description": "<p>昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "8...20",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"isSuccess\": true,\n  \"msg\": \"msg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"status\": 400,\n  \"isSuccess\": false,\n  \"msg\": \"errorMsg\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/UserApi.js",
    "groupTitle": "User"
  }
] });
