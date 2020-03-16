
var path = new Map();
var everydayDao = require('../dao/EverydayDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/WriteUtil');

function editEveryday(request, response) {
    request.on('data', function (data) {
        // data是前端发送过来的数据
        // 将前端发来的数据插入到数据库
        everydayDao.insertEveryday(data.toString().trim(), timeUtil.getNowDate(), function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        });
    })
}

path.set('/editEveryday', editEveryday);

module.exports.path = path;
