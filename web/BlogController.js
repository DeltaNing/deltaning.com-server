var path = new Map();
var blogDao = require('../dao/BlogDao');
var tagsDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/WriteUtil');
var url = require('url');

function queryBlogById(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end()
    })
}

path.set('/queryBlogById', queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end()
    })
}

path.set('/queryBlogCount', queryBlogCount);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        // console.log(result);
        for (var i = 0; i < result.length; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, ''); // 去除img标签
            result[i].content = result[i].content.replace(/<[^>]+>/g, ''); // 去除其他标签
            result[i].content = result[i].content.replace(/&nbsp;/g, ''); // 去除空行
            result[i].content = result[i].content.substring(0, 300) + '...';
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}

path.set('/queryBlogByPage', queryBlogByPage);
function editBlog(req, res) {
    // 获取url中的参数
    var params = url.parse(req.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace(/，/g, ',');
    // 监听client端发送的请求数据
    req.on('data', function (data) {
        // 将数据插入到数据库
        blogDao.insertBlog(data.toString(), params.title, tags, 0, timeUtil.getNowDate(), timeUtil.getNowDate(), function (result) {
            res.writeHead(200);
            res.write(respUtil.writeResult('success', '操作成功', null));
            res.end();

            // 查询tags表中是否存在该文章中的标签
            var tagList = tags.split(',');
            for (var i = 0; i < tagList.length; i ++) {
                // 查询tags表中是否存在该标签
                queryTag(tagList[i], result.insertId);
            }
        })
    })
}

path.set('/editBlog', editBlog);


function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        // console.log('tags表查询结果：', result);
        if (result == null || result.length == 0) { // 若不存在，插入该标签
            insertTag(tag, blogId)
        } else { // 若存在，将该标签id和该文章的id插入到tag_blog_mapping表中
            insertTagBlogMapping(result[0].id, blogId)
        }
    })
}

function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNowDate(), timeUtil.getNowDate(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNowDate(), timeUtil.getNowDate(), function (reslult) {})
}

module.exports.path = path;