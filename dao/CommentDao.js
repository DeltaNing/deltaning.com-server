var dbutil = require('./DBUtil');

function insertComment(blogId, parent, parentName, name, email, comments, ctime, utime, success) {
    // 定义插入数据库语句
    var insertSql = 'insert into comments set ?';
    var params = {
        blog_id: blogId,
        parent,
        parent_name: parentName,
        user_name: name,
        email,
        comments,
        ctime,
        utime
    };

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
            console.log('CommentDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryCommentsById(blogId, success) {
    // 定义插入数据库语句
    var querySql = 'select * from comments where blog_id = ?';
    var params = [blogId];

    // 链接数据库并执行插入操作
    var connection = dbutil.createConnection();
    // 1、连接数据库
    connection.connect();
    // 2、执行插入操作
    connection.query(querySql, params, function (error, result) {
        // 如果没有错误就返回结果
        if (error == null) {
            success(result)
        } else {
            // 若有错误，将错误打印到服务器控制台
            console.log('CommentDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryCommentsCountById(blogId, success) {
    // 定义插入数据库语句
    var querySql = 'select count(1) as count from comments where blog_id = ?';
    var params = [blogId];

    // 链接数据库并执行插入操作
    var connection = dbutil.createConnection();
    // 1、连接数据库
    connection.connect();
    // 2、执行插入操作
    connection.query(querySql, params, function (error, result) {
        // 如果没有错误就返回结果
        if (error == null) {
            success(result)
        } else {
            // 若有错误，将错误打印到服务器控制台
            console.log('CommentDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryNewComments(success) {
    // 定义插入数据库语句
    var querySql = 'select * from comments order by id desc limit 6';
    var params = [];

    // 链接数据库并执行插入操作
    var connection = dbutil.createConnection();
    // 1、连接数据库
    connection.connect();
    // 2、执行插入操作
    connection.query(querySql, params, function (error, result) {
        // 如果没有错误就返回结果
        if (error == null) {
            success(result)
        } else {
            // 若有错误，将错误打印到服务器控制台
            console.log('CommentDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}


module.exports.insertComment = insertComment;
module.exports.queryCommentsById = queryCommentsById;
module.exports.queryCommentsCountById = queryCommentsCountById;
module.exports.queryNewComments = queryNewComments;

