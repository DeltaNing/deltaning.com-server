var dbutil = require('./DBUtil');

function insertComment(blogId, parent, name, email, comments, ctime, utime, success) {
    // 定义插入数据库语句
    var insertSql = 'insert into comments set ?';
    var params = {
        blog_id: blogId,
        parent,
        user_name: name,
        email,
        comments,
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
            console.log('CommentDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryBlogByPage(page, pageSize, success) {
    // 定义插入数据库语句
    var querySql = 'select * from blog order by id desc limit ?, ?';
    var params = [page * pageSize, pageSize];

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
            console.log('BlogDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryBlogCount(success) {
    // 定义插入数据库语句
    var querySql = 'select count(1) as count from blog';
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
            console.log('BlogDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

function queryBlogById(bid, success) {
    // 定义插入数据库语句
    var querySql = 'select * from blog where id=?';
    var params = [bid];

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
            console.log('BlogDao Error: ', error)
        }
    });
    // 3、 断开数据库连接
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
