var dbutil = require('./DBUtil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    // 定义插入数据库语句
    var insertSql = 'insert into tag_blog_mapping set ?';
    var params = {
        tag_id: tagId,
        blog_id: blogId,
        ctime,
        utime
    }

    // 链接数据库并执行插入操作
    var connection = dbutil.createConnection();
    // 1、连接数据库
    connection.connect();
    // 2、执行插入操作
    connection.query(insertSql, params, function (error, result) {
        // 如果没有错误就返回结果
        if (error == null) {
            success(result)
        } else {
            // 若有错误，将错误打印到服务器控制台
            console.log('BlogDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}


module.exports.insertTagBlogMapping = insertTagBlogMapping;
