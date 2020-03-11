var express = require("express"); // 引入express

var app = new express(); // 新建一个服务

app.use(express.static("./page/")); // 设置静态文件所在目录，express默认找page文件夹下的index.html文件

app.listen(12306, function () {
   console.log("服务器已启动")
}); // 监听12306端口
