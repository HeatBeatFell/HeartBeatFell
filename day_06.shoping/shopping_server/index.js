// 引入express
const express = require("express");
const app = express();
// 引入cors
app.use(require('cors')());
// md5
const md5 = require('md5')
// 加密密钥
const d5 = "lkaslksdlkalsdjakd;l,.,q;wldmlksankjdnhai"
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
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
// 根据id 查询商品详情
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
    conn.query(sql, id, (error, data) => {
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
// 注册
app.post('/api/v1/register', (req, res) => {
    //1. 接收前端传来的数据
    let mobile = req.body.mobile;
    let password = req.body.password;
    // 2.验证数据（这里必须使用正则表达式）
    // 手机号
    let mobileRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!mobileRe.test(mobile)) {
        res.json({
            "ok": 0,
            "error": "手机号格式不正确"
        })
        return
    }
    // 验证密码
    let passwordRe = /^[a-zA-Z]\w{5,17}$/
    if (!passwordRe.test(password)) {
        res.json({
            "ok": 0,
            "error": "密码必须是以字母开头的,长度在6~18之间，只能包含字母、数字和下划线"
        })
        return
    }
    // 3.判断手机号码是否存在
    let sql = 'SELECT count(*) n FROM shop_users where mobile=?'
    conn.query(sql, mobile, (error, data) => {
        if (error) {
            res.json({
                'ok': 0,
                'error': error
            })
            return
        } else {
            // 如果大于0 就说明手机号已存在
            if (data[0].n > 0) {
                res.json({
                    'ok': 0,
                    'error': "手机号已存在"
                })
                return
            } else {
                // 否则就不存在然后写入数据库
                sql = 'INSERT INTO shop_users SET ?'
                let data = {
                    mobile: mobile,
                    password: md5(password + d5),
                    regtime: new Date().getTime().toString().substring(0, 10)
                }
                conn.query(sql, data, (error, data) => {
                    if (error) {
                        res.json({
                            'ok': 0,
                            'error': error
                        })
                        return
                    } else {
                        res.json({
                            'ok': 1
                        })
                    }
                })
            }
        }
    })
})
//登录
app.post('/api/v1/login', (req, res) => {
    // 1.获取前端传来的数据
    let mobile = req.body.mobile;
    let password = req.body.password;
    // console.log(mobile ,password)
    // 2.验证数据格式
    // 手机号
    let mobileRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!mobileRe.test(mobile)) {
        res.json({
            'ok': 0,
            'error': "手机号格式不正确"
        })
        return
    }
    //密码
    let passwordRe = /^[a-zA-Z]\w{5,17}$/
    if (!passwordRe.test(password)) {
        res.json({
            "ok": 0,
            "error": "密码必须是以字母开头的,长度在6~18之间，只能包含字母、数字和下划线"
        })
        return
    }
    // 3.数据库查询
    let sql = 'SELECT mobile , password FROM shop_users where mobile=? AND password=?'
    let data = [mobile, password]
    conn.query(sql, data, (error, data) => {
        if (error) {
            res.json({
                'ok': 0,
                'error': error
            })
        } else {
            res.json({
                'ok': 1,
                "data":{
                    "token":'ajshdasjdaoisdjlajsld;ksa;ld'
                }
            })
        }
    })
})

// 启动服务并监听
app.listen(9999, () => { console.log("localhost:9999") })