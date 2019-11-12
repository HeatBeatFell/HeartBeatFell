import Mock from "mockjs";
// 获取分类
Mock.mock("http://localhost:9999/api/v1/categories", "get", {
  ok: 1,
  "data|8-10": [
    {
      "id|+1": 1,
      cat_name: "@ctitle"
    }
  ]
});
// 获取题目

Mock.mock(
  /http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/question_count_info/,
  "get",
  {
    ok: 1,
    data: {
      total: 100,
      right: 93,
      wrong: 4,
      undo: 3
    }
  }
);

// 根据id 获取题目
Mock.mock(
  /http:\/\/localhost:9999\/api\/v1\/categories\/\d+\/questions\?type=(all|wrong|right|undo)/,
  "get",
  {
    ok: 1,
    "data|20-50": [
      {
        "id|+1": 1,
        title: "@ctitle",
        options: "@ctitle(5,10),@ctitle(5,10),@ctitle(5,10),@ctitle(5,10)",
        right: "@integer(0,3)",
        category_id: 2
      }
    ]
  }
);
