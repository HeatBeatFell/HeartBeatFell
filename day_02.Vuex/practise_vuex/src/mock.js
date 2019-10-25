import Mock from "mockjs";
// 分类
Mock.mock("http://localhost:7000/api/v1/classify", {
  "data|3-6": [
    {
      "id|+1": 1,
      "classify|3-6": "@cword"
    }
  ]
});
// 用户和积分
Mock.mock("http://localhost:7000/api/v1/users", {
  "data|5-10": [
    {
      "id|+1": 1,
      name: "@cname",
      point: "@integer(1,20)"
    }
  ]
});
// 根据分类获取题目
Mock.mock(/http:\/\/localhost:7000\/api\/v1\/classify\/\d\/question/, {
  "data|5-10": [
    {
      "id|+1": 1,
      "question|3-6": "@cword",
      "options|4": [{ qq: "@ctitle" }]
    }
  ]
});
// 题库
Mock.mock("http://localhost:7000/api/v1/answer", {
  data: {
    "ok|1": [0, 1]
  }
});
// 登录
Mock.mock("http://localhost:7000/api/v1/access_token", {
  "ok|1": [0, 1],
  data: {
    token: "egdsafewafdsa"
  },
  error: "账号或密码错误"
});
