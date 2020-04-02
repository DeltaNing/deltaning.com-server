var path = new Map();
var blogDao = require('../dao/BlogDao');
var tagDao = require('../dao/TagsDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao');
var respUtil = require('../util/WriteUtil');
var resultUtil = require('../util/resultUtil');
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
    tagBlogMappingDao.queryBlogIdByTagId(parseInt(params.tagId), function (res) {
        // 根据blogId查询blog详情
        blogDao.queryBlogByIds(res, parseInt(params.page), parseInt(params.pageSize), function (result) {
            result = resultUtil.filterResult(result);
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        });
    })
}

path.set('/queryBlogsByTagId', queryBlogsByTagId);


function queryBlogCountByTagId(request, response) {
    var params = url.parse(request.url, true).query;
    tagBlogMappingDao.queryBlogIdByTagId(parseInt(params.tagId), function (res) {
        blogDao.queryBlogCountByIds(res, function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        })

    })
}

path.set('/queryBlogCountByTagId', queryBlogCountByTagId);


module.exports.path = path;
