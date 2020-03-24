var everyDay = new Vue({
    el: "#everyDay",
    data: {
        content: '这里是每日一句名人名言'
    },
    computed: {
        getContent: function () {
            return this.content
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryEveryday'
        }).then(function (res) {
            everyDay.content = res.data.data[0].content;
        }).catch(function (err) {
            console.log(err)
        })
    }
});

var articleList = new Vue({
    el: '#articleList',
    data: {
        nowPage: 1, // 当前页码
        pageSize: 6, // 每页显示的文章数量
        count: 100, // 文章总数
        pageNumList: [],
        articleList: [
            {
                title: 'Laravel5.4安装passport时遇到的一些问题',
                content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
                date: '2019-12-06',
                views: '103',
                tags: 'laravel',
                id: '1',
                link: ''
            }
        ]
    },
    computed: {
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                let urlSearchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';

                let tagId = '';
                let search = '';

                for (var i = 0; i < urlSearchParams.length; i ++) {
                    let urlParams = urlSearchParams[i].split('=');
                    // 是否存在tagId
                    if (urlParams[0] === 'tagId') {
                        try {
                            tagId = urlParams[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }

                    // 是否存在search
                    if (urlParams[0] === 'search') {
                        try {
                            search = urlParams[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                console.log('tagId: '+ tagId, 'search: ' + search);
                if (tagId === '' && search === '') { // 不是查询情况和搜索情况
                    // 获取article列表
                    this.queryBlogList(page, pageSize);

                    // 获取博客文章总数
                    axios({
                        url: '/queryBlogCount',
                        method: 'get'
                    }).then(function (res) {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool();
                    })
                } else if (tagId) { // 通过tagId查询文章列表
                    this.queryBlogsByTagId(tagId, page, pageSize);

                    // 获取博客文章总数
                    axios({
                        url: '/queryBlogCountByTagId?tagId=' + tagId,
                        method: 'get'
                    }).then(function (res) {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool();
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else if (!tagId && search) { // 全局搜索情况
                    this.queryBlogBySearch(search, page, pageSize);
                    // 获取博客文章总数
                    axios({
                        url: '/queryBlogCountBySearch?search=' + search,
                        method: 'get'
                    }).then(function (res) {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool();
                    })
                }
            }
        }
    },
    created() {
        this.getPage(this.nowPage, this.pageSize);
    },
    methods: {
        queryBlogList(page, pageSize) {
            axios({
                url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize,
                method: 'get'
            }).then(function (res) {
                var result = res.data.data;
                var list = [];
                for (var i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = result[i].ctime;
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    temp.id = result[i].id;
                    temp.link = "/blog_detail.html?bid=" + result[i].id;
                    list.push(temp)
                }
                articleList.articleList = list;
                articleList.nowPage = page;
                articleList.generatePageTool();
            }).catch(function (error) {
                console.log(error)
            });
        },
        queryBlogsByTagId(tagId, page, pageSize) {
            axios({
                url: '/queryBlogsByTagId?tagId=' + tagId + '&page=' + (page - 1) + '&pageSize=' + pageSize,
                method: 'get'
            }).then(function (res) {
                var result = res.data.data;
                var list = [];
                for (var i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = result[i].ctime;
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    temp.id = result[i].id;
                    temp.link = "/blog_detail.html?bid=" + result[i].id;
                    list.push(temp)
                }
                articleList.articleList = list;
                articleList.nowPage = page;
                articleList.generatePageTool();
            }).catch(function (error) {
                console.log(error)
            });
        },
        generatePageTool() {
            var nowPage = this.nowPage;
            var pageSize = this.pageSize;
            var totalPage = (this.count + pageSize - 1) / pageSize;
            var result = [];
            result.push({text: "<<", page: 1});
            // 前两个条件和最后两个条件是为了保证选中最后一页或者第一页时，显示的还是5个页码
            if (nowPage > 4 && nowPage == totalPage) {
                result.push({text: nowPage - 4, page: nowPage - 4});
            }

            if (nowPage > 3 && nowPage >= totalPage - 1) {
                result.push({text: nowPage - 3, page: nowPage - 3});
            }

            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }

            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= totalPage) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }

            if (nowPage + 2 <= totalPage) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }

            if ((nowPage <= 2) && nowPage + 3 <= totalPage) {
                result.push({text: nowPage + 3, page: nowPage + 3});
            }

            if (nowPage == 1 && nowPage + 4 <= totalPage) {
                result.push({text: nowPage + 4, page: nowPage + 4});
            }

            result.push({text: ">>", page: parseInt(totalPage)});
            this.pageNumList = result;
            return result;
        },
        queryBlogBySearch(searchText, page, pageSize) {
            axios({
                url: '/queryBlogBySearch?search=' + searchText + '&page=' + (page - 1) + '&pageSize=' + pageSize,
                method: 'get'
            }).then(function (res) {
                var result = res.data.data;
                var list = [];
                for (var i = 0; i < result.length; i++) {
                    var temp = {};
                    temp.title = result[i].title;
                    temp.content = result[i].content;
                    temp.date = result[i].ctime;
                    temp.views = result[i].views;
                    temp.tags = result[i].tags;
                    temp.id = result[i].id;
                    temp.link = "/blog_detail.html?bid=" + result[i].id;
                    list.push(temp)
                }
                articleList.articleList = list;
                articleList.nowPage = page;
                articleList.generatePageTool()
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
});
