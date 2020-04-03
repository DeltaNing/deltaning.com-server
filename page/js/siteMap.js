var blogList = new Vue({
    el: '#blog_list',
    data: {
        blogList: []
    },
    computed: {

    },
    created: function () {
        axios({
            url: '/queryAllBlog',
            method: 'get'
        }).then(function (res) {
            console.log(res)
            var data = res.data.data;
            for (var i = 0; i < data.length; i ++) {
                data[i].link = '/blog_detail.html?bid=' + data[i].id;
            }
            blogList.blogList = data;
        }).catch(function (error) {
            console.log(error)
        })
    }
});
//
// var x = require('../../util/resultUtil');
// console.log(x)
