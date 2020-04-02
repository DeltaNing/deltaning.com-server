function filterResult(data) {
    let result = data;
    for (var i = 0; i < result.length; i ++) {
        result[i].content = result[i].content.replace(/<img[\w\W]*">/, ''); // 去除img标签
        result[i].content = result[i].content.replace(/<[^>]+>/g, ''); // 去除其他标签
        result[i].content = result[i].content.replace(/&nbsp;/g, ''); // 去除空行
        result[i].content = result[i].content.substring(0, 200) + '...';
    }
    return result;
}

module.exports.filterResult = filterResult;
