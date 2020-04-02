var dbutil = require('./DBUtil');

function insertBlog(content, title, tags, views, ctime, utime, success) {
    // 定义插入数据库语句
    // console.log(content)
    var insertSql = 'insert into blog set ?';
    var params = {
        content, title, views, tags, ctime, utime
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

function queryBlogCountByIds(bidList, success) {
    // 定义插入数据库语句
    var querySql = 'select count(1) as count from blog where id in ('+ bidList.toString()+')';
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

// 根据blog_id的数组，查询数组中所有的文章
function queryBlogByIds(bidList, page, pageSize, success) {
    // 将数组转成字符串
    // bidList.sort(function (a, b) {
    //     return b - a
    // });
    var str = bidList.toString();
    var querySql = 'select * from blog where id in (' + str + ') order by id desc limit ?,?';
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

function updateBlogViews(blogId, success) {
    // 定义插入数据库语句
    var updateSql = 'update blog set views = views + 1 where id = ?';
    var params = [blogId];

    // 链接数据库并执行插入操作
    var connection = dbutil.createConnection();
    // 1、连接数据库
    connection.connect();
    // 2、执行插入操作
    connection.query(updateSql, params, function (error, result) {
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

function queryHotBlogs(success) {
    // 定义插入数据库语句
    var querySql = 'select * from blog order by views desc limit 10';
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

function queryBlogBySearch(search, page, pageSize, success) {
    // 定义插入数据库语句
    var querySql = "select * from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%') order by id desc limit ?, ?;";
    var params = [search, search, page * pageSize, pageSize];

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

function queryBlogCountBySearch(search, success) {
    // 定义插入数据库语句
    var querySql = "select count(1) as count from blog where title like concat(concat('%', ?), '%') or content like concat(concat('%', ?), '%');";
    var params = [search, search];

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
module.exports.queryBlogByIds = queryBlogByIds;
module.exports.queryBlogCountByIds = queryBlogCountByIds;
module.exports.updateBlogViews = updateBlogViews;
module.exports.queryHotBlogs = queryHotBlogs;
module.exports.queryBlogBySearch = queryBlogBySearch;
module.exports.queryBlogCountBySearch = queryBlogCountBySearch;
