let randomTags = new Vue({
   el: '#randomTags',
   data: {
       tagList: [{link: '', tag: ''}]
   },
    computed: {
        tagColor() {
            return function () {
                let r = Math.random() * 255 + 50,
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


let newHot = new Vue({
   el: '#newHot',
   data: {
        hotList: [
            {title: '使用码云git的webhook实现生产环境代', link: 'https:www.deltaning.com'}
        ]
   },
    computed: {

    },
    created() {
        // todo: 获取article列表
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
            console.log(res)
        }).catch(function (error) {
            console.log(error)
        })
    }
});

let newComments = new Vue({
   el: '#newComments',
   data: {
       commentList: [
           {
               guestName: '入驻邀请',
               title: '使用码云git的webhook实现生产环境代',
               date: '1周前',
               link: 'https:www.deltaning.com'
           },{
               guestName: '入驻邀请',
               title: '使用码云git的webhook实现生产环境代',
               date: '1周前',
               link: 'https:www.deltaning.com'
           },{
               guestName: '入驻邀请',
               title: '使用码云git的webhook实现生产环境代',
               date: '1周前',
               link: 'https:www.deltaning.com'
           },{
               guestName: '入驻邀请',
               title: '使用码云git的webhook实现生产环境代',
               date: '1周前',
               link: 'https:www.deltaning.com'
           }
       ]
   },
    computed: {
       getNewCommentsList: function () {
           return this.list
       }
    },
    created: function () {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function (res) {
            console.log(res)
        }).catch(function (error) {
            console.log(error)
        })
    }
});
