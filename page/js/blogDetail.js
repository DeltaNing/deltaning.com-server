var blogDetail = new Vue({
    el: '#blogDetail',
    data: {
        title: '',
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

        var bid = -10;

        for (var i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split('=')[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split('=')[1]);
                } catch (e) {
                    console.log(e)
                }
            }
        }

        // 获取文章详情
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(function (res) {
            var result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
            blogDetail.ctime = timeStamp(result.ctime, 'zh', true);
            // 插入meta描述
            var metaTag = document.createElement('meta');
            metaTag.name = 'description';
            metaTag.content = blogDetail.title;
            document.getElementsByTagName('head')[0].appendChild(metaTag);
        }).catch(function (error) {
            console.log(error)
        })

        // 更新文章浏览次数
        axios({
            method: "get",
            url: "/updateBlogViews?bid=" + bid
        }).then(function (res) {
            // console.log(res)
        }).catch(function (error) {
            console.log(error)
        })
    }
});

var sendComment = new Vue({
    el: '#sendComment',
    data: {
        imgCode: '',
        codeText: '',
        tipText: '',
        showTips: false,
    },
    computed: {
        getImgCode() {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomImgCode'
                }).then(function (res) {
                    sendComment.imgCode = res.data.data.data;
                    sendComment.codeText = res.data.data.text;
                }).catch(function (error) {
                    console.log(error)
                })
            }
        },
        submitComment() {
            return function () {
                var urlSearchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';

                if (!urlSearchParams) {
                    return;
                }

                var bid = -10;

                for (var i = 0; i < urlSearchParams.length; i++) {
                    if (urlSearchParams[i].split('=')[0] === 'bid') {
                        try {
                            bid = urlSearchParams[i].split('=')[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }

                var parent = document.sendCommentForm.parent.value;
                var parentName = document.sendCommentForm.parentName.value;
                var name = document.sendCommentForm.name.value;
                var email = document.sendCommentForm.email.value;
                var comments = document.sendCommentForm.comments.value;
                var code = document.sendCommentForm.code.value;

                if (!name || !email || !comments) {
                    sendComment.tipText = '错误：信息不完整（昵称，邮箱）';
                    sendComment.showTips = true;
                    setTimeout(function () {
                        sendComment.showTips = false;
                    }, 2000);
                    return;
                }

                if (code.toLowerCase() != sendComment.codeText.toLowerCase()) {
                    alert('验证码错误');
                    return;
                }

                axios({
                    method: 'get',
                    url: `/addComment?bid=${bid}&parent=${parent}&parentName=${parentName}&name=${name}&email=${email}&comments=${comments}`
                }).then(function (res) {
                    sendComment.showTips = true;
                    sendComment.tipText = '提交成功';
                    setTimeout(function () {
                        sendComment.showTips = false;
                        sendComment.tipText = '';
                    }, 2000);
                    console.log(res)
                }).catch(function (error) {
                    console.log(error)
                })
            }

        }
    },
    created() {
        this.getImgCode();
    }
});

var blogComments = new Vue({
    el: '#blogComments',
    data: {
        commentsList: [
            {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'},
            {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'},
            {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'},
            {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'},
            {id: 1, user_name: 'Delta', ctime: '123456765432',comments: 'djasjflkdjlk', options: '回复@'}
        ],
        totalCount: '', // 总评论数
    },
    computed: {
        title: function () {
            return blogDetail.title
        },
        getComments() {
            return function () {
                var urlSearchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';

                if (!urlSearchParams) {
                    return;
                }

                var bid = -10;

                for (var i = 0; i < urlSearchParams.length; i++) {
                    if (urlSearchParams[i].split('=')[0] === 'bid') {
                        try {
                            bid = urlSearchParams[i].split('=')[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                axios({
                    url: `/queryCommentsByBlogId?bid=${bid}`,
                    method: 'get'
                }).then(function (res) {
                    blogComments.commentsList = res.data.data;
                    for (var i = 0; i < blogComments.commentsList.length ; i ++) {
                        if (blogComments.commentsList[i].parent > -1) {
                            blogComments.commentsList[i].options = "回复@" + blogComments.commentsList[i].parent_name;
                        }
                    }
                    // console.log(blogComments.commentsList)
                }).catch(function (error) {
                    console.log(error)
                });

                // 获取总评论数
                axios({
                    url: `/queryCommentsCountById?bid=${bid}`,
                    method: 'get'
                }).then(function (res) {
                    blogComments.totalCount = res.data.data[0].count;
                }).catch(function (error) {
                    console.log(error)
                })
            }
        },
        replayComment() {
            return function (commentId, parent_name) {
                document.sendCommentForm.parent.value = commentId;
                document.sendCommentForm.parentName.value = parent_name;
                // 跳转到提交评论区域
                location.href = '#sendComment';

            }
        }
    },
    created() {
        this.getComments()
    }
});
