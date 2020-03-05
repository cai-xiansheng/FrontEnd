# Vue 总结

## Vue 基础语法

### Vue 的基本代码

```javascript
var vm = new Vue({
	el: '#app', // id属性
    data: {
    	msg: 'xxx', // 数据
    },
    methods: {
    	// 方法定义
    },
    // 不仅如此，还有很多的内容。
})
```

### Vue的基础语法

#### `v-clock`

1. 解决了插值表达式闪烁的问题。
2. 属性元素，直接添加即可。

#### `v-text`

1. 将 data 的数据直接渲染到标签中，会将标签内的所有内容全部覆盖掉
2. `<div v-text="msg"></div>`

#### `v-html`

1. 将 data 中的属性直接渲染到标签中，并且直接覆盖标签，将数据输出为 html 格式。
2. `<div v-html="msg"></div>`

#### `v-bind:`

1. 属性绑定机制，在使用变量表示属性或者传递属性值时使用。
2. `v-bind` 简写为：“:”，可以直接省略 v-bind
3. `<input type="button" v-bind:value="'按钮' + msg"/>`
4.  `<h1 :class="['red','thin','italic',flag?'active':'']">这是一个很大的H1</h1>`
5.  `<h1 :class="['red','thin','italic',{'active' : flag}]">这是一个很大的H1</h1>`
6.  上面的两个绑定了样式，这也就是相关的样式绑定。

#### `v-on`

1. 事件绑定机制，绑定方法。
2. 简写为“@”
3. `<input type="button"  value="按钮" v-on:mouseover="show" />`
4. `<input type="button"  value="按钮" @mouseover="show" />`

#### `v-model`

1. 双向数据绑定指令
2. `v-model` 只能运用在表单元素中，也就是那些有数值变化的元素中。
3. `<input type="text" v-model:value="msg" style="width: 100%;"/>`

#### `v-for`

1. 循环数组
	+ 循环数组时，存在两个关键值:数据值，索引
	+ `v-for="item,index in list"`
2. 循环对象
	+ 循环对象时，存在三个关键值：数据值，键值，索引
	+ `v-for="val,key,index in item"`
	+ 注意对应值的位置。
3. 迭代数字
	+ `v-for="count in 10"`
	+ 若 count 的值从 1 开始，那么 count 的值就会逐个循环，循环到 10 为止。
4. `:key`
	+ key 属性只能使用 number 获取的 string
	+ 在组件中，使用v-for循环的时候，或者在一些特殊情况下，如果v-for有问题，必须在使用 v-for的同时之地那个唯一的字符出或数字，类型：key值
	+ key 在使用的时候，必须使用 `v-bind` 属性绑定的形式，指定 key 的值。

#### vue事件修饰

##### `.stop`

> 冒泡机制：就是在执行内部事件的时候，执行完内部事件然后去执行外部事件，直到事件执行完，
1. 会阻止冒泡从这一层开始的所有事件
2. `.stop` 会阻止冒泡机制的发生，就是只触发本次事件，不会牵连到其他事件。

##### `.prevent`

1. 阻止默认事件
2. 比如 <a> 标签有链接的默认事件，`.prevent`就可以直接阻止这种行为。

##### `.self`

1. 只会触发当前事件，不会影响其他事件。
2. `.self` 只会阻止本身的冒泡，并不会阻止所有的冒泡行为

##### `.once`

1. 顾名思义，就是这个保证事件只能触发一次。

### 自定义全局修饰符

1. 定义：`Vue.config.keyCodes.f2 = 113`
2. 这儿对应的数值是对应 f2 键的名称，也就是按这个键，传递的值。
3. 使用：`<inputtype="text" v-model="name" @keyup.f2="add"/>`

## vue 过滤器

+ 如果私有过滤器和全局过滤器名称冲突的时候，会优先调用私有过滤器。

### 全局过滤器

1. `Vue.fifter('过滤器名称',function(dateStr,pattern = "YYYY-MM-DD HH:mm:ss"){})`
2. 全局过滤器：`Vue.filter('过滤器名称',function(){})`
3. 过滤器的 function 中的第一个参数已经被固定死了，永远都是过滤器的管道修饰符，传递过来的数据在第二位。
4. `{{ 数据 | 过滤器名称 }}`

### 局部过滤器

1. 直接在 vm 实例中使用 filters ，在其中定义私有过滤器。
2. `filters:{ 过滤器名称：function( dataeStr,pattern ){} }`
3. 在这儿可以定义多个局部过滤器。

## vue钩子

> 指令的简写： `'fontsize':function(el,binding){}` ，这就相当于把代码写到了bind和update中去。

### 全局指令

```text
• 使用Vue.directive() 定义全局指令
• bind:function(el){}
    • 每当指令绑定到元素上的时候，会立即执行这个bind这个函数，只执行一次
    • 注意：在每个函数中，第一个参数永远是el，表示被绑定了指令的那个元素，这个el参数，是一个原生的js对象
    • 与样式相关的操作，一般都可以在bind中执行
• inserted:function(el){}
    • inserted表示元素插入到DOM中的时候，会执行inserted函数
    • 和js行为有关的操作，最好在inserted中，防止行为不生效
• updated:function(){}
	• 当VNode更新的时候，会执行updated（DOM节点更新），可能会多次触发
使用的时候格式：
	Vue.directive('元素',{
    	bind:function(el){},
        inserted:function(el){},
        updated:function(){}
    })
```

### 局部指令

1. 在 `directives:{}` 中定义局部指令。
2. `'fontweight':{}` 对属性的操作。

## 生命周期函数

[生命周期函数图](https://cdn.nlark.com/yuque/0/2019/png/657552/1576854240583-85e3ab97-238b-495e-a621-062a136fbc79.png?x-oss-process=image/resize,w_1440)

在声明周期函数中最常用的就是 `created(){}` ，在这儿可以调用方法或者数据，因为此时数据、方法已经全部加载完毕。

## `vue-resource`

### get请求

`this.$http.get('url').then(function(result){})`
+ 这样就可以拿到返回的值。

### post请求

`this.$http.post('url',{要提交的内容},{emulateJSON:true}).then(result=>{})`
+ 第一个参数：要请求的URL地址
+ 第二个参数：要提交的服务器的数据，要以对象形式提交给服务器`{name:this.name}`
+ 第三个参数：是一个配置对象，要以哪种表单数据类型提交过去，`{emulateJSON:true}`，以普通表单的形式，将数据提交给服务器 `application/x-www-from-urlencoded`

### jsonp请求

`this.$http.jsonp('url').then(result=>{})`

### 全局启用emulateJSON选项

1. `Vue.http.option.emulateJSON = true;`
2. 全局范围内规定表单数据类型，这样就直接避免类型出错的问题
3. 传递的 `json` 数据 `{name:this.name}`

### 全局配置数据接口根域名

1. `Vue.http.options.root = 'http://vue.studyit.io';`
2. 如果我们通过全局配置了，请求数据接口的根域名，则在每次单独发起的http请求的时候，请求的url路径应该以相对路径开头，前面不能带/，否则就不会启用跟路径做拼接。
3. 这样就可以避免服务器域名变化，造成文件的大量修改。

## vue动画

### 过渡动画

[过渡动画](https://cdn.nlark.com/yuque/0/2019/png/657552/1576911967214-f5e017d0-5b2f-42d7-88fe-dbdc628fe656.png)

### javascript钩子动画

> 这就是实现小球之类的动画

1. beforeEnter 表示动画入场之前，此时，动画尚未开始，可以在 beforeEnter 中设置元素开始动画之前的起始样式 
2. enter表示动画开始之后的样式，这里，可以设置小球完成动画之后，结束状态
	2.1 `el.offsetWidth`可以认为 el.offsetWidth 会强制动画刷新
	2.1 done必须回调，这里的done就是afterEnter这个函数，也就是说：done是afterEnter函数的引用
3. 动画完成之后，会调用afterEnter

```javascript
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

## vue组件

### 全局组件

1. `var login = { template: '<h1>1234</h1>'}`
2. `Vue.component('mylogin',login)`
3. `Vue.component('mylogin',Vue.extend({template:'<h3>这是使用Vue.extend 创建的组件</h3>'}))` 也可以直接这样。

### 局部组件

1. `components:{'mylogin':login,login}`
2. 这儿有两种注册方式：login 就是属性和方法的简写。

### 组件之间的传值

#### 父组件向子组件传值

1. 通过属性绑定机制v-bind将Vue实例中的数据引用过来。
` <com1 v-bind:parentmsg= "msg"></com1>`
2. 在子组件中使用props将数据保存下来。
	` props:['parentmsg'],`
	+ 这个数据只可读，不能强制赋值。

#### 子组件向父组件传值

1. 通过事件绑定机制v-on，将Vue实例中的方法绑定到一个自定义的名称中。
` <com2 @func = 'show'></com2>`
2. 然后通过子组件中的方法触发传递来的方法。
`this.$emit('func',this.sonmsg)`

#### 利用浏览器存储数据

1. 读取数据`JSON.parse(localStorage.getItem('cmts') || '[]')`
2. 存储数据`localStorage.setItem('cmts',JSON.stringify(list))`

#### 获取DOM元素

1. 在元素中使用这个 `ref="myh3"`
2. 获取DOM属性 `this.$refs.myh3.innerText`

## 路由`vue-router`

### 路由对象

```javascript
  var rouedrObj = new VueRouter({
    routes:[// 路由匹配规则
    {path:'',redirect:'/login'},
    {path:'/login',component:login},
    {path:'/register',component:register}
    ],
    linkActiveClass:'myactive'
  })
```

1. `linkActiveClass:'myactive'` 激活路由选项，就是点击的时候会触发选择。
2. 这里的 `redirect` 会强制跳转到 `/login` 页面。
3. `<transition mode="out-in"> <router-view></router-view> </transition>` 这儿就是显示路由组件的界面。
4. `mode="out-in"` 规定了组件的出入次序。
5. routes 路由的匹配规则。
6. `<router-link to="/login" tag="span">登录</router-link>` 这儿是路由的选择模块，tag 表示要渲染的标签，to 表示路由匹配的规则。
7. vue-router 就是通过监测路由的变化，来切换组件的。

### 路由的传参

1. `{path:'/login/:id/:name',component:login},` 这儿传递参数。
2. 通过 `this.$route.query.id`访问传递过来的参数。

### 子路由

```javascript
    path:'/account',
    component:account,
    children:[
      {path:'login',component:login},
      {path:'register',component:register}
    ]
```
1. 使用children 属性，实现子路由时，子路由的path前面不要带/，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址

### 路由实现经典布局
```javascript
    <div id="app">

      <router-view ></router-view>
      <div class="container">

        <router-view name="left"></router-view>
        <router-view name="main"></router-view>

      </div>
    </div>
          routes:[
          { path:'/',components:{
            'default':header,
            'left':leftBox,
            'main':mainBox
          } }
        ]
```
1. 首先考虑布局制定相应的样式。
2. 再在页面中的相应位置留置<router-view ></router-view>。
	+ 留置的router-view 就会在后面渲染页面。
	+ 在必要的router-view中使用name指定相应的组件模板对象的路径，
3. 创建路由对象。
	+ 明确组件模板对象对应的路由地址。

