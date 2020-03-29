// app.js
var express = require('express');
const cors = require('cors')
var app = express();
app.use(cors());
app.post('/login', (req, res) => {

    res.end(JSON.stringify({
        "meta": {
            "data": 200,
            "msg": "登录成功"
        },
        "data": {
            "token": "fdsafsafasfdasfdas",
            "id": 100,
            "username": "admin",
            "url": "www.baidu.com"
        }
    }))
})
app.get('/userInfo', (req, res) => {
    res.end(JSON.stringify({
        "meta": {
            "data": 200,
            "msg": "获取用户信息成功"
        },
        "data": {
            "id": 100,
            "username": "linzhe",
            "roles": "student",
            "course": [{
                    id: 1,
                    name: 'math',
                    label: '数学',
                    path: '/math'
                },
                {
                    id: 2,
                    name: 'chinese',
                    label: '语文',
                    path: '/chinese'
                },
                {
                    id: 3,
                    name: 'english',
                    label: '英语',
                    path: '/english'
                },
            ],
            "homeworkList": {
                math: [{
                        id: "1",
                        title: "数字图像频域隐写与分析技术的实现",
                        endTime: "2020-03-12"
                    },
                    {
                        id: "2",
                        title: "数字图像空域隐写与分析技术的实现",
                        endTime: "2020-03-04"
                    },
                    {
                        id: "3",
                        title: "简单隐写与分析技术的实现",
                        endTime: "2020-02-26"
                    }
                ],
                chinese: [{
                        id: "1",
                        title: "语文01",
                        endTime: "2020-03-12"
                    },
                    {
                        id: "2",
                        title: "语文02",
                        endTime: "2020-03-04"
                    },
                    {
                        id: "3",
                        title: "语文03",
                        endTime: "2020-02-26"
                    }
                ],
                english: [{
                        id: "1",
                        title: "英语01",
                        endTime: "2020-03-12"
                    },
                    {
                        id: "2",
                        title: "英语02",
                        endTime: "2020-03-04"
                    },
                    {
                        id: "3",
                        title: "英语03",
                        endTime: "2020-02-26"
                    }
                ]
            }

        }
    }))
})
var server = app.listen(5000, function () {
    console.log("服务已启动")
})