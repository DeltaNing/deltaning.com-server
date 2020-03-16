
/* 读取配置文件server.conf */
var fs = require("fs");

var globalConfig = {};

var conf = fs.readFileSync("./server.conf");

var configArr = conf.toString().split("\n");

for (var i = 0; i < configArr.length; i ++) {
    if (!configArr[i]) continue; // 解析出来的数组内可能会有空串
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
}

// console.log(conf.toString(), configArr, globalConfig);

module.exports = globalConfig;
