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


// 添加评论
app.get('/addComment', loader.get('/addComment'));
// 生成二维码
app.get('/queryRandomImgCode', loader.get('/queryRandomImgCode'));


// 通过文章id获取文章的所有评论/留言
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
// 通过文章id获取文章的评论总数
app.get('/queryCommentsCountById', loader.get('/queryCommentsCountById'));


// 获取所有文章列表--地图页面
app.get('/queryAllBlog', loader.get('/queryAllBlog'));


// 获取随机云标签
app.get('/queryRandomTags', loader.get('/queryRandomTags'));


// 根据标签id查询所有blog的id
app.get('/queryBlogsByTagId', loader.get('/queryBlogsByTagId'));
app.get('/queryBlogCountByTagId', loader.get('/queryBlogCountByTagId'));


app.get('/updateBlogViews', loader.get('/updateBlogViews'));


app.get('/queryHotBlogs', loader.get('/queryHotBlogs'));


app.get('/queryNewComments', loader.get('/queryNewComments'));

app.listen(globalConfig.port, function () {
   console.log("服务器已启动")
}); // 监听12306端口
