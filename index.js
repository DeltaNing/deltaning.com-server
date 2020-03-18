var express = require("express"); // 引入express
var globalConfig = require('./config'); // 引入配置文件
var loader = require('./loader'); // 引入路径的键值对

var app = new express(); // 新建一个服务

app.use(express.static("./page/")); // 设置静态文件所在目录，express默认找page文件夹下的index.html文件

/* 定义路由 */
// 发送新编辑的每日一句的接口
app.post('/editEveryday', loader.get('/editEveryday'));
// 获取最新每日一句的接口
app.get('/queryEveryday', loader.get('/queryEveryday'));
// 编辑文章接口
app.post('/editBlog', loader.get('/editBlog'));
// 获取文章列表
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
// 获取文章总数
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
// 通过文章id获取文章
app.get('/queryBlogById', loader.get('/queryBlogById'));

app.listen(globalConfig.port, function () {
   console.log("服务器已启动")
}); // 监听12306端口
