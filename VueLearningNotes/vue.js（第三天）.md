Vue.js：[📎vue.js](https://www.yuque.com/attachments/yuque/0/2019/js/657552/1576912105231-42ab5931-679c-44f7-8d05-ca10241ee072.js)

Vue-resourse.js：[📎vue-resource.js](https://www.yuque.com/attachments/yuque/0/2019/js/657552/1576911802697-06285c2e-86f6-4e2f-8f42-445c6cff4884.js)

第三方类animate.css：[📎animate.css](https://www.yuque.com/attachments/yuque/0/2019/css/657552/1576912120533-36202357-fef9-4ae3-b0a4-d62e990ccae8.css)

bootstrapt层叠样式：[📎bootstrap.css](https://www.yuque.com/attachments/yuque/0/2019/css/657552/1576912190848-1a70a6ad-5c13-4a69-be3e-b26ec8fb1b76.css)[📎bootstrap-responsive.css](https://www.yuque.com/attachments/yuque/0/2019/css/657552/1576912198767-7bfb7b47-e1b1-49b9-b69a-eb4a4f12112a.css)

## v-resourse数据的请求、渲染

参考文档1：[Vue-resourse根目录](https://github.com/pagekit/vue-resource)

参考文档2：[Vue-resourceHttpRequest](https://github.com/pagekit/vue-resource/blob/develop/docs/http.md)



```
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
        <script src="lib/vue-resource.js"></script>
        <link rel="stylesheet" type="text/css" href="lib/bootstrap.css"/>
        <link rel="stylesheet" type="text/css" href="lib/bootstrap-responsive.css"/>
    </head>
    <body>
        <div id="app">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">添加品牌</h3>
                </div>
                <div class="panel-body form-inline">        
                    <label>
                        Name:
                        <input type="text" v-model="name" class="form-control"/>
                    </label>        
                    <input type="button" value="添加" @click="add" class="btn btn-primary"/>      
                </div>
            </div>
            
            <table class="table table-bordered table-hover table-striped<!-- 隔行变色 -->">
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Ctime</th>
                    <th>Operation</th>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key = "item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.ctime}}</td>
                        <td>
                            <a href="#" @click.prevent="del(item.id)" >删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <script type="text/javascript">
            // 如果我们通过全局配置了，请求数据接口的根域名，则在每次单独发起的http请求的时候，请求的url路径应该以相对路径开头，前面不能带/，否则就不会启用跟路径做拼接
            Vue.http.options.root = 'http://vue.studyit.io';
            //全局启用 emulateJSON 选项
            Vue.http.option.emulateJSON = true;
            
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    list: [//存放所有品牌列表的的数组
                        {id : 1,name : '五菱宏光',ctime : new Date()},
                        {id : 2,name : '众泰',ctime : new Date()},
                        {id : 2,name : '众泰',ctime : new Date()},
                    ]
                },
                created() {
                    //当 vm 实例的data和methods初始化好了，vm实例会自动执行created 这个生命周期函数
                    this.getAllList()
                },
                methods:{

                    getAllList(){
                        //获取所有车的品牌列表
                        /**
                         * 1.由于我们已经导入了Vue-resource这个包，所以，可以直接通过this.$http 来发起数据请求
                         * 2.根据接口API文档，知到，获取列表的时候，应该发起一个　ｇｅｔ 请求
                         * 3.this.$http.get('url').then(function(result){})
                         * 4.当通过then指定回调函数中，可以拿到数据服务器返回的result
                         * 5.先判断result.status是否等于0，如果等于0，就成功了，可以把我们拿到的result.message 赋值给this.list ；如果不等于0，可以弹框，获取数据失败！
                         */
                        this.$http.get('api/getprodlist').then(result =>{
                            //注意：通过$http 获取到的数据包，都在result.body 中放着
                            //通过接口获取到所有的数据
                            var result = result.body
                            if(result.status === 0){
                                //成功了
                                this.list = result.message
                                //将获取到的数据给我们已经定义的数据数组。然后通过数据数组就可以完成数据的渲染
                            }else{
                                //失败了
                                alert('数据获取失败！')
                            }
                        })
                    },
                    
                    add(){
                        /**
                         * 分析：
                         * 1.通过查看API接口，发现，要发送一个post请求， this.$http.post
                         * 2.this.$http.post()接收三个参数
                         *      2.1 第一个参数：要请求的URL地址
                         *      2.2 第二个参数：要提交的服务器的数据，要以对象形式提交给服务器{name:this.name}
                         *      2.3 第三个参数：是一个配置对象，要以哪种表单数据类型提交过去，{emulateJSON:true}，以普通表单的形式，将数据提交给服务器 application/x-www-from-urlencoded
                         * 3.在post方法中，使用.then 来设置成功的回调函数，如果想要拿到成功的结果，需要result.body
                         */
                        this.$http.post('api/addproduct',{name:this.name},/* {emulateJSON:true} */).then(result => {
                            //当 全局启用 emulateJSON 选项 之后，我们就不用在post请求中添加{emulateJSON:true}
                            if(result.body.status === 0){
                                //成功了！
                                //添加完成后，只需要手动，再调一下getAllList 就能刷新品牌列表
                                getAllList()
                                //清空name，这儿还没有理解
                                this.name = ''
                            }else{
                                //失败了！
                                alert('添加失败！')
                        }
                    })
                },
            
                    del(){
                        //删除品牌数据
                        this.$http.get('api/delproduct' + id).then(result=>{
                            //这儿说明一下：result=>{}     《===》           function(result){}
                            if(result.body.status == 0){
                                this.getAllList()
                            }else{
                                alert('删除失败！')
                            }
                        })
                    }   
            });
        </script>
    </body>
```

- 参考HTML：[📎01.vue-resourse改造品牌列表.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576909039357-397de99d-9726-4eab-889e-3d4222f001ae.html)

### post请求



```
this.$http.post('http://vue.studyit.io/api/addproduct',{name:this.name},{emulateJSON:true} ).then(result => {})
```

- \1. 通过查看API接口，发现，要发送一个post请求， this.$http.post
- \2. this.$http.post()接收三个参数

- - 2.1 第一个参数：要请求的**URL地址**，这儿的路径用到了绝对路径。
  - 2.2 第二个参数：**要提交的服务器的数据**，要以对象形式提交给服务器{name:this.name}
  - 2.3 第三个参数：是一个配置对象，要**以哪种表单数据类型提交**过去，{emulateJSON:true}，以普通表单的形式，将数据提交给服务器 application/x-www-from-urlencoded

- \3. 在post方法中，**使用.then 来设置成功的回调函数**，如果想**要拿到成功的结果，需要result.body**

### get请求



```
this.$http.get('api/getprodlist').then(result =>{})
this.$http.get('api/delproduct' + id).then(result=>{})
第二行：get方式提交数据，也会返回数据
```

- \1. 由于我们已经导入了**Vue-resource**这个包，所以，可以直接通过this.$http 来发起数据请求。
- 2**. 根据接口API文档**，知到，获取列表的时候，应该发起一个get 请求
- \3. **this.$http.get('url').then(function(result){})**
- \4. 当通过**then指定回调函数中**，可以**拿到数据服务器返回的result**
- \5. 这儿的 **result=>{}** 就相当于 **function(result){}**
- \6. 这儿用到了相对路径

### 全局启用emulateJSON选项



```
Vue.http.option.emulateJSON = true;
```

- \1. 全局范围内规定表单数据类型，这样就直接避免类型出错的问题
- \2. 参考文档3：[emulateJSON](https://github.com/pagekit/vue-resource/blob/develop/docs/config.md)

### 全局配置数据接口根域名



```
Vue.http.options.root = 'http://vue.studyit.io';
```

- \1. 如果我们通过全局配置了，请求数据接口的根域名，则在每次单独发起的http请求的时候，请求的url路径应该以相对路径开头，前面不能带/，否则就不会启用跟路径做拼接
- \2. 参考文档3：[全局数据根接口](https://github.com/pagekit/vue-resource/blob/develop/docs/config.md)



## Vue动画

### 使用过度名实现动画

![transition.png](https://cdn.nlark.com/yuque/0/2019/png/657552/1576911967214-f5e017d0-5b2f-42d7-88fe-dbdc628fe656.png)

- 参考HTML：[📎03.动画-使用过度类名实现过度动画.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576912046875-5c610bf2-285d-41c6-ac79-071d07a8d12b.html)

#### 修改v-前缀



```
            <style>
        .my-enter,
        .my-leave-to{
          opacity: 0;
          transform: translateY(80px);
        }
        .my-enter-active,
        .my-leave-active{
          transition: all 0.8s ease;
        }
      </style>
            <transition name="my">
                <h6 v-if="flag2">这是一个H3</h6>
            </transition>
```

- \1. 给对应的transition一个name值
- \2. 用name里面的值替换v的位置即可
- \3. 参考HTML：[📎04.动画-修改v-前缀.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576912564762-d6341ff9-1661-4cb0-88ab-0ae1f6697c87.html)

### 使用第三方类实现动画

参考文档4：[animate](http://www.animate.net.cn/)



```
        <div id="app">
            <input type="button" value="toggle" @click="flag = !flag"/>
            <!-- 需求：点击按钮，让h3显示，再点击，让h3隐藏 -->
            <transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="400" >
                <h3 v-if="flag">这是一个H3</h3>
            </transition>
            
            
            
            <!-- 使用 :duration = "毫秒值" 来统一设置 入场 和 离场 时候的动画时长 -->
            <transition enter-active-class="bounceIn" leave-active-class="bounceOut" :duration="400" >
                <h3 v-if="flag">这是一个H3</h3>
            </transition>
            
            
            <!-- 使用：:duration="{enter:200,leave:400}" 来分别设置入场的时长和离场的时长 -->
            <transition 
            enter-active-class="bounceIn" 
            leave-active-class="bounceOut" 
            :duration="{enter:200,leave:400}" >
                <h3 v-if="flag">这是一个H3</h3>
            </transition>
            
        </div>
        
        
        <script type="text/javascript">
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    flag: false
                },
                methods:{
                    
                }
            })
        </script>
```

- 其中使用了JavaScript钩子，见下一小节解释。
- 参考HTML：[📎05动画-使用第三方类实现动画.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576913235190-fed754dd-1ec1-483e-a3f4-1c2a2823bfeb.html)

### JavaScript钩子

参考文档5：[JavaScript钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)



```
        <div id="app">
            <input type="button" value="快到碗里来" @click="flag = !flag"/>
            <!-- 1.使用transition元素把小球包裹起来 -->
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
                <div class="ball" v-show="flag"></div>
            </transition>
        </div>
        <script type="text/javascript">
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    flag:false
                },
                methods:{
                    //注意：动画钩子函数的第一个参数：el，表示要执行动画的那个DOM元素是个原生的DOM对象
                    //大家可以认为，el是通过document.getElementById('') 方式获取原生的JS DOM 对象
                    beforeEnter(el){
                        //beforeEnter 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter 中设置元素开始动画之前的起始样式 
                        //设置小球开始动画之前的，起始位置
                        el.style.transform = "translate(0,0)"
                    },
                    enter(el,done){
                        //这句话，没有实际的作用，但是，如果不写，写不出来动画效果；
                        //可以认为el.offsetWidth 会强制动画刷新
                        el.offsetWidth
                        //enter表示动画开始之后的样式，这里，可以设置小球完成动画之后，结束状态
                        el.style.transform = "translate(150px,450px)"
                        el.style.transition = 'all 1s ease'
                        
                        //done必须回调，这里的done就是afterEnter这个函数，也就是说：done是afterEnter函数的引用
                        done()
                    },
                    afterEnter(el){
                        //动画完成之后，会调用afterEnter
                        this.flag = !this.flag
                    },
                }
            })
        </script>
```

- \1. **beforeEnter** 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter 中设置元素开始动画之前的起始样式 
- \2. **enter**表示动画开始之后的样式，这里，可以设置小球完成动画之后，结束状态

- - 2.1 **el.offsetWidth**  可以认为el.offsetWidth 会强制动画刷新
  - 2.1 **done必须回调**，这里的done就是afterEnter这个函数，也就是说：done是afterEnter函数的引用

- \3. 动画完成之后，会调用**afterEnter**
- \4. 参考HTML：[📎06.动画-使用钩子函数模拟小球半场动画.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576913699007-403a25d4-4f03-4a99-8c64-715a96ca779c.html)

## 列表动画



```
    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
        <style type="text/css">
            li{
                border: 1px dashed #999;
                margin: 5px;
                line-height: 35px;
                font-size: 15px;
                width: 100%;
            }
            
            li:hover{
                background-color: hotpink;
                transition: all 0.8s ease;
            }
            
            /* 进入，即添加的时候使用的 */
            .v-enter,
            .v-leave-to{
                opacity: 0;
                transform: translateY(80);
            }
            
            .v-enter-active,
            .v-leave-active{
                transition: all 0.6s ease;
            }
            /* 下面的 .v-move和 .v-leave-active 配合使用能够实现。列表后续元素，渐渐地飘上来 */
            
            /* move,这个就是离开的时候用的，也就是删除者以元素的时候 */
            .v-move{
                transition: all 0.6s ease;
            }
            .v-leave-active{
                position: absolute;
            }
        </style>
    </head>
    <body>
        <div id="app">
            
            <div>
                <label>
                    Id:
                    <input type="text" v-model="id"/>
                </label>
                <label>
                    Name:
                    <input type="text" v-model="name"/>
                </label>
                
                <input type="button" value="添加" @click="add"/>
            </div>
            
            <!-- <ul> -->
                <!-- 在实现列表过度的时候，如果需要过渡元素，是通过v-for循环渲染出来的，不能使用transition包裹，需要使用transitionGroup -->
                <!-- 如果要为v-for循环创建的元素设置动画，必须为每一个元素设置：:key属性 -->
                <!-- 给transition-group 添加appear属性 就可以实现页面刚展示时候的效果 -->
                <!-- 通过为transition-group 元素 ，设置tag属性，指定transition-group 渲染为指定的元素，如果不指定tag属性，默认渲染为span标签 -->
                <transition-group appear="" tag="ul">
                    <li v-for="item,i in list" :key = "item.id" @click="del(i)">
                        {{item.id}} --- {{item.name}}
                    </li>
                </transition-group>
            <!-- </ul> -->
        </div>
        <script type="text/javascript">
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    id:'',
                    name:'',
                    list:[
                        {id: 1,name: '赵高'},
                        {id: 2,name: '秦晖'},
                        {id: 3,name: '闫浩'},
                        {id: 4,name: '魏忠贤'},
                    ]
                },
                methods:{
                    add (){
                        this.list.push({id:this.id,name:this.name})
                        this.id = this.name = ''
                    },
                    del(i){
                        this.list.splice(i,1)
                    }
                }
            })
        </script>
    </body>
```

- \1. transition-group

- - 在实现列表过度的时候，如果需要过渡元素，是通过v-for循环渲染出来的，不能使用transition包裹，需要使用transitionGroup
  - 给transition-group 添加appear属性 就可以实现页面刚展示时候的效果
  - 通过为transition-group 元素 ，设置tag属性，指定transition-group 渲染为指定的元素，如果不指定tag属性，默认渲染为span标签

- \2. 删除时候的样式

- - v-move v-leave-active

- \3. 参考HTML：[📎07.列表动画.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577113251739-dacb4ad6-732b-409f-b58c-058bd9d391b3.html)

## Vue组件

参考文档6：[组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)

### 公共组件

```
        <div id="app">
            <mycoml></mycoml>
        </div>
        <script type="text/javascript">
            
            // 1.1 使用Vue.extend 来创建Vue组件
            /* var com1 = Vue.extend({
                template:'<h3> 这是一个使用Vue.extend 创建的组件模板对象 </h3>',
                //通过template 属性 ，制定了要展示的HTML 结构
            }) */
            // 1.2 使用Vue.component('组件的名称',创建出来的组件模板对象)
            // Vue.component('myComl',com1)
            // 如果使用 Vue.component 定义了全局组件的时候，组件名称使用了 驼峰命名，则在引用组建的时候，需要把大写的驼峰改为小写的字母，同时两个单词使用 - 链接。
            // 如果不使用驼峰，则直接拿名称来引用就行。
            // Vue.component('mycoml',com1)
            
            
            //Vue.component 第一个参数：组件名称，将来引用组建的时候，就是一个标签的形式来引入它的
            //第二个参数：Vue.extend 创建组件，其中 template 就是组件将来要展示的html类
            Vue.component('mycoml',Vue.extend({
                template:'<h3>这是使用Vue.extend 创建的组件</h3>'
            }))
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                },
                methods:{   
                }
            })
        </script>
    </body>
```

- \1. 使用Vue.extend 来创建Vue组件

- - var com1 = Vue.extend({tmplate:'<h3> 这是一个使用Vue.extend 创建的组件模板对象 </h3>'})
  - 通过template 属性 ，制定了要展示的HTML 结构

- \2. 通过Vue.component('组件的名称',创建出来的组件模板对象)

- - Vue.component('myComl',com1)
  - 如果使用了Vue.component 定义了全局组件的时候，组件名称使用了驼峰命名法的时候，在引用组建的时候，需要将大写的变成小写，并在前边加“-”。

- - - 如果不使用，直接拿来引用就可以。

- \3. 将创建和定义组件同时处理

- - Vue.component('mycoml',Vue.extend({template:'<h3>这是使用Vue.extend 创建的组件</h3>'}))
  - Vue.component 第一个参数：组件名称，将来引用组件的时候，就是一个标签的形式来引入它的
  - 第二个参数：Vue.extend 创建组件，其中template就是将来要展示的html类。

- \4. 参考HTML：[📎08.组件-创建组建的方式.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577197813688-59331b44-c18e-4878-80ab-a7c3d6fac141.html)
- \5. 不论是那种方式创建出来的组件，组件的template 属性，指向的模板内容，必须有且只有唯一一个的一个根元素。

- - Vue.component('mycom2',{template:'<div><h3>这是直接使用Vue.component来创建出来的组件</h3><span>123456</span></div>'})

### 私有组件



```
    <body>
        <div id="app">
            <mycom3></mycom3>
        </div>
        <div id="app2">
            <mycom3></mycom3>
            <login></login>
        </div>
        <!-- 在被#app控制的外边，使用template 元素，定义组件的Html模板结构 -->
        <template id="tmp1">
            <div>
                <h1>这是通过template元素，在外部定义的组件结构，这个方式，有代码的提示和高亮</h1>
                <h4>sandjk</h4>
            </div>
        </template>
        <template id="tmp2">
            <h1>这是私有组件</h1>
        </template>
        <script type="text/javascript">
            Vue.component('mycom3',{
                template:'#tmp1'
            })
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                },
                methods:{
                }
            });
            var vm2 = new Vue({
                el:'#app2',
                data:{
                },
                methods:{
                },
                filters:{
                    //过滤器
                },
                directives:{
                    //指令
                },
                components:{
                    //定义实例内部私有组件
                    login:{
                        template:'#tmp2'
                    }
                },
                //钩子函数
                beforeCreate() {},
                created() {},
                beforeMount() {},
                mounted() {},
                beforeUpdate() {},
                updated() {},
                beforeDestroy() {},
                destroyed() {}, 
            })
        </script>
    </body>
```

- \1. 在创建实例中使用components:{}定义内部私有组件。这样定义的组件就只能在对应的el下边使用。
- \2. 参考HTML：[📎10.组件-组建的创建方式3.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577199061754-8b48b93b-c035-43b3-89d4-621de06186db.html)
- \3. 在被#app控制的外边，使用template 元素，定义组件的Html模板结构。

- - <template id="tmp2"><div><h1>这是私有组件</h1><span>123</span></div></template>
  - 这个在公共组件中可以使用，也可以在私有组件中使用。

### 组件中的data属性



```
    <body>
        <div id="app">
            <mycom1></mycom1>
        </div>
        <script type="text/javascript">
            // 1. 组件可以有自己的数据data 
            // 2. 组建的data和实例的data有一点不一样，实例中的data可以为一个对象，但是组件中的data必须是一个方法
            // 3. 组件中的data除了必须为一个方法之外，还必须返回一个对象才行。
            Vue.component('mycom1',{
                template:'<h1>这是全局组件___{{msg}}</h1>',
                data:function(){
                    return{
                        msg: '这是组件中共的data定义的数据'
                    }
                }
            })
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                },
                methods:{
                }
            })
        </script>
    </body>
```

- \1. 组件可以有自己的数据data 
- \2. 组建的data和实例的data有一点不一样，实例中的data可以为一个对象，但是组件中的data必须是一个方法
- \3. 组件中的data除了必须为一个方法之外，还必须返回一个对象才行。
- \4. 格式如图中10-16行。
- \5. 参考HTML：[📎11.组件-组件中的data和methods.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577199625262-67c370b8-c33d-4164-84e4-90bca431331d.html)

### 组件中的data和methods



```
    <body>
        <div id="app">
            <counter></counter>
            <hr/>
            <counter></counter>
            <hr/>
            <counter></counter>
        </div>
        <template id = 'tmp1'>
            <div >
                <input type="button" value="+1" @click="increment"/>
                <h3>{{count}}</h3>
            </div>
        </template>
        <script type="text/javascript">
            var dataObj = {count: 0}
            //这是一个计数器的组件，身上有个按钮，每次点击按钮，让data中的count值+1
            Vue.component('counter',{
                template:'#tmp1',
                data:function  () {
                    // return dataObj
                    return {count:0}
                },
                methods:{
                    increment(){
                        this.count++
                    }
                }
            })
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                },
                methods:{
                }
            })
        </script>
    </body>
```

- \1. 组件定义的时候，必须使用独立的data属性，避免变量联动。（不要直接向16行这样定义）
- \2. 定义方法methods：

- - 在methods中定义的格式跟new Vue 中使用methods的定义方法一致。

- \3. 参考HTML：[📎12.组件-why comonents data must be a function.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577248051346-aeec4897-8075-40c8-a0fe-67e9456e4800.html)

### 组件的切换

#### 两个组件的切换



```
    <body>
        <div id="app">
            <a href="#" @click.prevent="flag = true">登录</a>
            <a href="#" @click.prevent="flag = false">注册</a>
            <login v-if = 'flag' ></login>
            <register v-else = 'flag'></register>
        </div>
        <script type="text/javascript">
            Vue.component('login',{
                template:'<h3>登陆组件</h3>'
            })
            Vue.component('register',{
                template:'<h3>注册组件</h3>'
            })
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    flag:true
                },
                methods:{   
                }
            })
        </script>
    </body>
```

- \1. 使用if-else来判断两个的组件的显示。
- \2. 借助变量flag来使用if-else。
- \3. 参考HTML：[📎13.组件切换-方式.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577248034921-9939c826-809d-48b2-b556-10bd9f87cd1b.html)

#### 多个组件的切换



```
    <body>
        <div id="app">
            <a href="" @click.prevent="comName='login'">登录</a>
            <a href="" @click.prevent="comName='register'">注册</a>
            <!-- Vue提供了 component ,来展示对应名称的组件 -->
            <!-- component 是一个占位符， ：is属性，可以用来指定要展示的组建的名称 -->
            <component :is="comName"></component>
            <!-- 总结：当前学习了几个Vue提供的标签？？？ -->
            <!-- component,template,transition,transitionGroup -->
        </div>
        <script type="text/javascript">
            //组件名称是 字符串
            Vue.component('login',{
                template:'<h3>登陆组件</h3>'
            })
            Vue.component('register',{
                template:'<h3>注册组件</h3>'
            })
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    comName:''
                    //当前component中的 ：is绑定的组件的名称
                },
                methods:{
                }
            })
        </script>
    </body>
```

- \1. Vue提供了 component ,来展示对应名称的组件
- \2. component 是一个占位符， ：is属性，可以用来指定要展示的组建的名称
- \3. [📎14.组件切换-方式2.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577248165279-008d329d-2723-41af-aca5-1d1e1ae76349.html)

#### 组件切换的动画



```
        <style type="text/css">
            .v-enter,
            .v-leave-to{
                opacity: 0;
                transform: translateX(150px);
            }
            
            .v-enter-active,
            .v-leave-active{
                transition: all 0.5s ease;
            }
        </style>
        <div id="app">
            <a href="" @click.prevent="comName='login'">登录</a>
            <a href="" @click.prevent="comName='register'">注册</a>
            <!-- Vue提供了 component ,来展示对应名称的组件 -->
            <!-- component 是一个占位符， ：is属性，可以用来指定要展示的组建的名称 -->
                <!-- 通过mode属性，设置组件切换的时候的模式 -->
                <transition mode="out-in">
                    <component :is="comName"></component>
                </transition>   
            <!-- 总结：当前学习了几个Vue提供的标签？？？ -->
            <!-- component,template,transition,transitionGroup -->
        </div>
```

- \1. 在style中，定义进入，离开的动画与时间。
- \2. 使用transition元素控制要使用动画的元素，这样就可以使动画展现在上边。
- \3. 通过mode属性，设置组件切换的时候的模式。

- - 如果不适用，那么就会使其动画效果叠加。（这样并不好看）

- \4. 参考HTML：[📎15.组件切换-组件切换动画.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1577249211759-e1352dcf-ae39-4783-8151-5c3f843834f9.html)





**所有文件已上传**[GitHub](https://github.com/cai-xiansheng/FrontEnd)