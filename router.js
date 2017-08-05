//路由模块
//1.创建一个可以挂在路由的router对象
//1.1加载express模块
var express = require('express');
//1.2通过express对象创建router
var router =  express.Router();
//加载业务模块
var handler = require('./handler.js');
var config = require('./config.js');
//2.为router对象上挂载一些路由
router.get('/favicon.ico',handler.static);
router.get('/',handler.index);
router.get('/index',handler.index);
router.get('/details',handler.details);
router.get('/submit',handler.submit);
router.get('/r',handler.addGet);
router.post('/r',handler.addPost);
//处理静态资源
router.use('/resources' , express.static(config.staticPath));
//把router对象暴露出去
module.exports =router;