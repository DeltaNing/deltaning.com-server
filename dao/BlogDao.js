var dbutil = require('./DBUtil');

function insertBlog(content, title, tags, views, ctime, utime, success) {
    // 定义插入数据库语句
    var insertSql = 'insert into blog set ?';
    var params = {
        content, title, views, tags, ctime, utime
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
    var querySql, params;
    if (typeof bid === 'number') { // 查询某一篇文章
        querySql = 'select * from blog where id=?';
        params = [bid];
    } else if (typeof bid === 'object') { //查询几篇文章
        // 将数组转成字符串
        var str = bid.toString();
        querySql = 'select * from blog where id in (' + str + ') order by id desc';
        params = [];
    }

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

function queryAllBlog(success) {
    // 定义插入数据库语句
    var querySql = 'select * from blog order by id desc;';
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

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
