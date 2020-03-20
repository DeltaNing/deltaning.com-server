var path = new Map();
var blogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var respUtil = require('../util/WriteUtil');
var url = require('url');

function queryRandomTags(request, response) {
    tagDao.queryAllTags(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false
        });
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryRandomTags', queryRandomTags);

function queryBlogsByTagId(request, response) {
    var params = url.parse(request.url, true).query;
    var page = parseInt(params.page);
    var pageSize = parseInt(params.pageSize);
    var newResult = {};
    tagBlogMappingDao.queryBlogIdByTagId(parseInt(params.tagId), function (res) {
        // 根据blogId查询blog详情
        blogDao.queryBlogById(res, function (result) {
            for (var i = 0; i < result.length; i ++) {
                result[i].content = result[i].content.replace(/<img[\w\W]*">/, ''); // 去除img标签
                result[i].content = result[i].content.replace(/<[^>]+>/g, ''); // 去除其他标签
                result[i].content = result[i].content.replace(/&nbsp;/g, ''); // 去除空行
                result[i].content = result[i].content.substring(0, 300) + '...';
            }
            newResult.count = result.length;
            newResult.blogList = result.slice(parseInt(page * pageSize), parseInt(page * pageSize + pageSize));
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', newResult));
            response.end();
        })

    })
}

path.set('/queryBlogsByTagId', queryBlogsByTagId);



module.exports.path = path;
