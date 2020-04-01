/* 加载所有web文件夹中所有接口的回调函数 */

var fs = require("fs");
var globalConfig = require("./config"); // 读取所有配置

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig['web_path']); // 读取路径下的所有文件
// console.log('files:', files);
for (var i = 0; i < files.length; i ++) {
    var temp = require('./' + globalConfig["web_path"] + '/' + files[i]);
    // console.log(temp.path)
    if (temp.path) {
        // for (var [key, value] of temp.path) {
        //     // console.log(key, value)
        //     if (pathMap.get(key) == null) {
        //         pathMap.set(key, value);
        //     } else {
        //         throw new Error('url path异常，url: ' + key);
        //     }
        // }
        temp.path.forEach(function (value, key, map) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value);
            } else {
                throw new Error('url path异常，url: ' + key);
            }
        })
        controllerSet.push(temp)
    }
}


module.exports = pathMap; // 导出所有web文件夹中的内容（路径(key)--方法(value)，键值对）
