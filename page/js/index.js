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
       articleList: [
           {
               title: 'Laravel5.4安装passport时遇到的一些问题',
               content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
               date: '2019-12-06',
               views: '103',
               tags: 'laravel',
               id: '1',
               link: ''
           },{
               title: 'Laravel5.4安装passport时遇到的一些问题',
               content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
               date: '2019-12-06',
               views: '103',
               tags: 'laravel',
               id: '2',
               link: ''
           },{
               title: 'Laravel5.4安装passport时遇到的一些问题',
               content: '安装时可能不支持高版本，我使用了composer require laravel/passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...',
               date: '2019-12-06',
               views: '103',
               tags: 'laravel',
               id: '3',
               link: ''
           }
       ]
   },
    computed: {
      getArticleList() {
          return this.articleList
      }
    },
    created() {
       // todo: 获取article列表
    }
 });
