import Mock from "mockjs";

// 登录
Mock.mock("http://localhost:9999/api/v1/users/access_token", "post", {
  "ok|1": "@integer(0,1)",
  error: "账号或密码错误",
  data: {
    token: "egdsafewafdsa",
    face: "@dataImage(size)"
  }
});

// 注册
Mock.mock("http://localhost:9999/api/v1/users/register", "post", {
  "ok|1": 1
});

// 修改密码
Mock.mock("http://localhost:9999/api/v1/users/passwords", "post", {
  "ok|1": "@integer(0,1)",
  error: "原密码不正确"
});

// 修改头像
Mock.mock("http://localhost:9999/api/v1/users/face", "post", {
  "ok|1": 1
});

// 上传头像
Mock.mock("http://localhost:9999/api/v1/users/upload", "post", {
  "ok|1": "@integer(0,1)",
  error: "原密码不正确",
  data: {
    path: ""
  }
});

// 获取分类
Mock.mock("http://localhost:9999/api/v1/categories", "get", {
  "ok":1,
  data: [
    {
      id: 1,
      cat_name: "HTML",
      'cat_percent': '@integer(0,100)'
    },
    {
      id: 2,
      cat_name: "CSS",
      'cat_percent': '@integer(0,100)'
    },
    {
      id: 3,
      cat_name: "javaScript",
      'cat_percent': '@integer(0,100)'
    },
    {
      id: 4,
      cat_name: "Vue",
      'cat_percent': '@integer(0,100)'
    },
    {
      id: 5,
      cat_name: "Node",
      'cat_percent': '@integer(0,100)'
    },
    {
      id: 6,
      cat_name: "Es6",
      'cat_percent': '@integer(0,100)'
    }
  ]
});


// 排行榜
Mock.mock('http://localhost:9999/api/v1/heros', 'get', {
  'ok': 1,
  'data|30': [
    {
      'id|+1': 1,
      'username': '@cname',
      'integral': '@integer(0,1024)'
    }
  ]
})






// 根据分类ID获取所有题
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions/, 'get', {
  'ok': 1,
  'data|2-20': [
    {
      'id|+1': 1,
      'title': '@ctitle',
      'options': ['@ctitle', '@ctitle', '@ctitle', '@ctitle'],
      'right': '@integer(0,3)'
    }
  ]
})
// 答案
Mock.mock(/http:\/\/localhost:9999\/api\/v1\/questions\/\d+\/answers\/[0123]/, 'get', {
  'ok': '@integer(0,1)',
  'error': '选择的题目不存在！'
})
