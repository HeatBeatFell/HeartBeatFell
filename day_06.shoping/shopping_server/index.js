// 引入express
const express = require("express");
const app = express();
// 引入cors
app.use(require('cors')());
// 连接数据库
const mysql = require("mysql")
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shopping'
});

conn.connect();

// 获取图片
app.get("/api/v1/main_ad_images", (req, res) => {
    let sql = "SELECT image , link FROM shop_swipe_images"
    conn.query(sql, (error, data) => {
        if (error) {
            res.json({
                " ok": 0,
                "error": error
            })
        } else {
            res.json({
                "ok": 1,
                "data": data
            })
        }
    })
})
// 获取分类
app.get("/api/v1/index_categories", (req, res) => {
    let sql = "SELECT * FROM shop_categories"
    conn.query(sql, (err, data) => {
        if (err) {
            res.json({
                "ok": 0,
                "error": err
            })
        } else {
            res.json({
                "ok": 1,
                "data": data
            })
        }
    })
})
// 获取商品详情
app.get("/api/v1/index_goods", (req, res) => {
    let page = req.query.page || 1;
    let per_page = req.query.per_page || 20;

    let offect = (page - 1) * per_page

    conn.query(`SELECT * FROM shop_goods LIMIT ${offect},${per_page}`, (err, data) => {
        if (err) {
            res.json({
                "ok": 0,
                "error": err
            })
        } else {
            res.json({
                "ok": 1,
                "data": data
            })
        }
    })
})

app.get('/api/v1/goods', (req, res) => {
    // 获取id
    let id = req.query.id
    // 将id转化成字符串 
    id = id.split(",")
    // 为了防止sql注入  我们这里选择预处理的解决办法
    // 循环id数组将来决定？数量
    let wh = []
    id.forEach(v => {
        wh.push("?")
    });
    wh = wh.join(",")


    let sql = ` SELECT * FROM shop_goods WHERE id IN(${wh})`
    conn.query(sql,id, (error, data) => {
        if (error) {
            res.json({
                "ok": 0,
                " error": error
            })
        } else {
            res.json({
                "ok": 1,
                "data": data
            })
        }
    })


})


// 启动服务并监听
app.listen(9999, () => { console.log("localhost:9999") })