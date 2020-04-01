var randomTags = new Vue({
   el: '#randomTags',
   data: {
       tagList: [{link: '', tag: ''}]
   },
    computed: {
        tagColor() {
            return function () {
                var r = Math.random() * 255 + 50,
                    g = Math.random() * 255 + 50,
                    b = Math.random() * 255 + 50;
                return `rgb(${r}, ${g}, ${b})`
            }
        },
        tagSize() {
            return function () {
                return Math.random() * 20 + 12 + 'px';
            }
        }
    },
    created() {
       // 获取随机标签
        axios({
            url: '/queryRandomTags',
            method: 'get'
        }).then(function (res) {
            var result = res.data.data;
            var list = [];
            for (var i = 0; i < result.length; i ++) {
                list.push({
                    tag: result[i].tag,
                    link: '/?tagId='+ result[i].id
                });
            }
            randomTags.tagList = list;
        }).catch(function (error) {
            console.log(error)
        })
    }
});


var newHot = new Vue({
   el: '#newHot',
   data: {
        hotList: [
            {title: '使用码云git的webhook实现生产环境代', link: 'https:www.deltaning.com'}
        ]
   },
    computed: {

    },
    created() {
        // 获取article列表
        axios({
            method: 'get',
            url: '/queryHotBlogs'
        }).then(function (res) {
            var result = res.data.data;
            var list = [];
            for (var i = 0; i < result.length; i ++) {
                var temp = {};
                temp.title = result[i].title;
                temp.link = 'blog_detail.html?bid=' + result[i].id;
                list.push(temp)
            }
            newHot.hotList = list;
            // console.log(res)
        }).catch(function (error) {
            console.log(error)
        })
    }
});

var newComments = new Vue({
   el: '#newComments',
   data: {
       commentList: [
           {
               user_name: '入驻邀请',
               comments: '使用码云git的webhook实现生产环境代',
               ctime: '1周前',
               link: '/blog_detail.html?bid=blogId#commentId'
           },{
               user_name: '入驻邀请',
               comments: '使用码云git的webhook实现生产环境代',
               ctime: '1周前',
               link: '/blog_detail.html?bid=blogId#commentId'
           },{
               user_name: '入驻邀请',
               comments: '使用码云git的webhook实现生产环境代',
               ctime: '1周前',
               link: '/blog_detail.html?bid=blogId#commentId'
           },{
               user_name: '入驻邀请',
               comments: '使用码云git的webhook实现生产环境代',
               ctime: '1周前',
               link: '/blog_detail.html?bid=blogId#commentId'
           },
       ]
   },
    computed: {},
    created: function () {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function (res) {
            var result = res.data.data;
            for (var i = 0; i < result.length; i ++) {
                result[i].link = '/blog_detail.html?bid=' + result[i].blog_id + '#comment-' + result[i].id;
                result[i].ctime = timeFormat(result[i].ctime);
            }
            newComments.commentList = result;
            // console.log(newComments.commentList)
        }).catch(function (error) {
            console.log(error)
        })
    }
});

var search = new Vue({
    el: '#searchBar',
    data: {},
    computed: {},
    created() {},
    methods: {
        searchBlog() {
            var searchText = document.getElementById('searchText').value;
            location.href = '/?search=' + searchText;
            console.log(searchText)
        }
    }
});


function timeStamp(timestamp, splitSymbol, isSecond) {
    var d = new Date(timestamp * 1000);
    var result = '';
    var secondText = ' ' + d.getHours() + ':' + d.getMinutes();
    if (splitSymbol == '-') {
        result = d.getFullYear() + splitSymbol + (d.getMonth() + 1) + splitSymbol + d.getDate() + (isSecond ? secondText : '');
    } else {
        result = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + (isSecond ? secondText : '');
    }
    // if (isSecond) { // 显示秒
    //     result = d.getFullYear() + splitSymbol + (d.getMonth() + 1) + splitSymbol + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
    // } else {
    //     result = d.getFullYear() + splitSymbol + (d.getMonth() + 1) + splitSymbol + d.getDate();
    // }
    console.log(result)
    return result;

}

function timeFormat(timestamp) {
    if (timestamp <= 0) {
        return '';
    }
    var time = parseInt(timestamp) * 1000;
    var now = new Date().getTime();
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var d = now - time;
    if (d < 0) {
        return
    }

    var result = ''; // 返回的结果

    var monthC = d / month;
    var weekC = d / (7 * day);
    var dayC = d / day;
    var hourC = d / hour;
    var minuteC = d / minute;

    if (monthC >= 1) {
        if (monthC <= 12) {
            result = parseInt(monthC) + '月前';
        } else {
            result = parseInt(monthC / 12) + "年前";
        }
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if (minuteC >= 1) {
        result = parseInt(minuteC) + "分钟前";
    } else {
        result = '刚刚';
    }
    return result;
}
