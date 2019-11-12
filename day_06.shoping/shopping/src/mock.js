import Mock from "mockjs";
Mock.mock("http://localhost:9999/api/v1/main_ad_images", "get", {
  ok: 1,
  "data|5-8": [
    {
      image: "@dataImage(430x200)"
    }
  ]
});
Mock.mock("http://localhost:9999/api/v1/index_categories", "get", {
  ok: 1,
  "data|12": [
    {
      "id|+1": 1,
      cat_name: "@cname"
    }
  ]
});
Mock.mock(
  /http:\/\/localhost:9999\/api\/v1\/index_goods\?page=\d+&per_page=\d+/,
  "get",
  {
    ok: 1,
    "data|10": [
      {
        "id|+1": 1,
        goods_name: "@ctitle",
        price: "@integer(2000,10000)",
        image: "@dataImage(130x130)"
      }
    ]
  }
);

// Mock.mock("http://localhost:9999/api/v1/index_goods", "get", option => {
//   let query = JSON.parse(option.body);
//   let theId = (query.page - 1) * query.per_page + 1;
//   return Mock.mock({
//     ok: 1,
//     "data|6": [
//       {
//         "id|+1": theId,
//         goods_name: "@ctitle",
//         "price|10-10000": 1,
//         image: "@dataImage(130x130)"
//       }
//     ]
//   });
// });
