var express = require("express"); // 引入express
var globalConfig = require('./config'); // 引入配置文件
var loader = require('./loader'); // 引入路径的键值对

var app = new express(); // 新建一个服务

app.use(express.static("./page/")); // 设置静态文件所在目录，express默认找page文件夹下的index.html文件

app.post('/editEveryday', loader.get('/editEveryday'));

app.listen(globalConfig.port, function () {
   console.log("服务器已启动")
}); // 监听12306端口
