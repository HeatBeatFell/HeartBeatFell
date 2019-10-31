import Mock from "mockjs";

Mock.mock("http://127.0.0.1/api/v1/login", {
  "data|1-10": [
    {
      "id|+1": 1,
      " student_name": "@cname",
      "age":"@integer(1,150)",
      "face":'@rgba'
    }
  ]
});
