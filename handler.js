//加载mongodb模块
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var config = require('./config.js');
var url = config.url;
var router = require('./router.js');
var db = require('./db.js');
module.exports.index =function(req,res){
	db.find('news',{},function(docs){
		//渲染首页
		res.render('index',{title:"Hacker News Index",items:docs});
	})
}
//2.处理details页面的数据
module.exports.details = function(req,res){
	db.find('news',{id:parseInt(req.query.id)},function(docs){
		if(docs.length>0){
			//渲染首页
			res.render('details',{NewsTitle:docs[0].title ,NewsContent:docs[0].text})
		} else {
			res.render('404');
		}
	})

}
//3.处理submit页面数据
module.exports.submit = function(req,res){
	res.render('submit');
}
//4.处理get请求
module.exports.addGet = function(req,res){
	var query = req.query;
	GetorPost(query,res);
}
//5.处理post请求渲染页面
module.exports.addPost = function(req,res){
	var body = req.body;
	GetorPost(body,res);
}
//6.处理静态资源
module.exports.static = function(req,res){
	if(req.path === '/favicon.ico'){
		req.path = '/resources/images/y18.gif';
		router.use('/resources' , express.static(config.staticPath));
	}
}


//封装一个get和post请求的函数
function GetorPost(params,res){
	var model = {
		title:params.title,
		url:params.url,
		text:params.text,
		id:parseInt(params.id)
	}
	db.insert('news',model,function(result){
		res.redirect('/');
	})
}