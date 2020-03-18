function getUrlParams(string) {
    var params = [];
    var list = string.split('?')[1].split('&');

    for (var i = 0; i < list.length; i ++) {
        var temp = {};
        temp[list[i].split('=')[0]] = list[i].split('=')[1];
        params.push(temp)
    }
    return params;
}

module.exports.getUrlParams = getUrlParams;
