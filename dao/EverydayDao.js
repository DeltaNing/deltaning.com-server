var dbutil = require('./DBUtil');

function insertEveryday(content, ctime, success) {

    // var insertSql = "insert into every_day ('content','ctime') values (?,?)";
    // var params = [content, ctime];
    var insertSql = 'INSERT INTO every_day SET ?';
    var params = {
        "content": content,
        "ctime": ctime
    };

    // 连接数据库
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result)
        } else {
            console.log(error)
        }
    });
    connection.end();
}

module.exports.insertEveryday = insertEveryday;