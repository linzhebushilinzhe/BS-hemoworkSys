// app.js
var express = require('express');
const cors =require('cors')
var app = express();
app.use(cors());
app.post('/login',(req,res)=>{

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
app.get('/userInfo',(req,res)=>{
    res.end(JSON.stringify({
        "meta": {
            "data": 200,
            "msg": "获取用户信息成功"
          },
          "data": {
            "id": 100,
            "username": "linzhe",
            "roles": "student",
            "course": [
                {
                    name: 'math',
                    label: '数学',
                    path: '/math'
                },
                {
                    name: 'chinese',
                    label:'语文',
                    path: '/chinese'
                },
                {
                    name: 'english',
                    label:'英语',
                    path: '/english'
                },                
            ],
          }
    }))
})
var server = app.listen(5000, function () {
 console.log("服务已启动")
})