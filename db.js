//封装连接数据库的方法,用以调用
//加载mongodb模块
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var config = require('./config.js');
var url = config.url;
//封装查询数据库的方法
module.exports.find = function(collectionName,condition,callback){
	connect(function(db){
		db.collection(collectionName).find(condition).toArray(function(err,docs){
			if(err){
				if(db){
					db.close();
				}
				throw err;
			}
			//拿到数据后就关闭数据库
			db.close();
			callback(docs);
		})
	})
}
//封装插入数据库的方法
module.exports.insert = function(collectionName,model,callback){
	connect(function(db){
		db.collection(collectionName).insert(model,function(err,result){
			if(err){
				throw err;
			}
			//拿到数据后就关闭数据库
			db.close();
			callback(result);
		})
	})
}
//封装一个数据库连接的方法
function connect(callback){
	MongoClient.connect(url,function(err,db){
		if(err){
			throw err;
		}
		callback(db);
	})
}