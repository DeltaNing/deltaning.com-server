var path = new Map();
var blogDao = require('../dao/BlogDao');
var commentDao = require('../dao/CommentDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require('../util/WriteUtil');
var svgCaptcha = require('svg-captcha');
var url = require('url');

function queryRandomImgCode(request, response) {
    var img = svgCaptcha.create({
        fontSize: 50,
        width: 100,
        height: 34,
        color: ['#7a609f', '#000000', '#006fcf'],
        // background: '#cc9966'
    });
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '评论成功', img));
    response.end()
}

path.set('/queryRandomImgCode', queryRandomImgCode);

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent), params.parentName, params.name, params.email, params.comments, timeUtil.getNowDate(), timeUtil.getNowDate(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end()
    })
}

path.set('/addComment', addComment);

function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end()
    })
}

path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountById(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountById(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end()
    })
}

path.set('/queryCommentsCountById', queryCommentsCountById);

module.exports.path = path;
