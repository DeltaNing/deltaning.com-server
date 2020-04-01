
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

                var bid = -1;

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

var aboutComments = new Vue({
    el: '#aboutComments',
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

                var bid = -1;

                axios({
                    url: `/queryCommentsByBlogId?bid=${bid}`,
                    method: 'get'
                }).then(function (res) {
                    aboutComments.commentsList = res.data.data;
                    for (var i = 0; i < aboutComments.commentsList.length ; i ++) {
                        aboutComments.commentsList[i].ctime = timeStamp(aboutComments.commentsList[i].ctime, 'zh', true);
                        if (aboutComments.commentsList[i].parent > -1) {
                            aboutComments.commentsList[i].options = "回复@" + aboutComments.commentsList[i].parent_name;
                        }
                    }
                }).catch(function (error) {
                    console.log(error)
                });

                // 获取总评论数
                axios({
                    url: `/queryCommentsCountById?bid=${bid}`,
                    method: 'get'
                }).then(function (res) {
                    aboutComments.totalCount = res.data.data[0].count;
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
