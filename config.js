//关于路径的问题写的比较死,不利于后期的维护,
//所以可以单独设置一个文件来配置路径
//配置端口号,可以动态更改
var path = require('path');
module.exports = {
	port : 9091,
	dataPath : path.join(__dirname, 'data', 'data.json'),
	viewPath : path.join(__dirname,'views'),
	staticPath: path.join(__dirname,'resources'),
	url:'mongodb://127.0.0.1:27017/hackernews'
}