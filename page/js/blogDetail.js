var blogDetail = new Vue({
    el: '#blogDetail',
    data: {
        title: '标题',
        content: '',
        views: '',
        tags: '',
        ctime: ''
    },
    computed: {},
    created: function () {
        var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split("?")[1].split('&') : '';
        if (!searchUrlParams) {
            return;
        }

        var bid = -1;

        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e)
                }
            }
        }

        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (res) {
            var result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
            blogDetail.ctime = result.ctime;
            console.log(res)
        }).catch(function (error) {
            console.log(error)
        })
    }
});
