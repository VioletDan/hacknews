//加载express模块
var express = require('express');
//加载配置文件模块
var config = require('./config.js');
//加载bodyParser模块
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var router = require('./router.js');

// 0. 注册一个 body-parser 【挂载中间件】
// parse application/x-www-form-urlencoded 
app.use('/', bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use('/', bodyParser.json());



//配置模板引擎
// 1.设置模板文件的路径(也就是views所指向的路径)
app.set('views',config.viewPath);
// 2.设置模板文件的后缀名(创建自己的模板引擎)
app.engine('.html',require('ejs').renderFile);
// 3.设置所使用的模板引擎为html模板引擎
app.set('view engine','html');

// 处理路由操作
app.use(router);

app.listen(config.port,function(){
	console.log('http://localhost:' + config.port);
})