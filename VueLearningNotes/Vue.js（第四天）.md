# Vue.js（第四天）


# 复习

## 小球动画的实现

```html
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			.ball{
				width: 15px;
				height: 15px;
				background-color: red;
				border-radius: 51%;
			}
		</style>
	</head>
	<body>
		<div id="app">
			
			<input type="button" value="加入购物车" @click="flag = !flag"/>
			
			<transition
				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter">
				
				<div class="ball" v-if="flag"></div>
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
					beforeEnter(el){
						el.style.transform = 'translate(0,0)'
					},
					enter(el,done){
						el.offsetWidth
						
						el.style.transform = 'translate(150px,450px)'
						el.style.transition = 'all 1s ease'
						done()
					},
					afterEnter(el){
						// 这句话，第一个功能，是控制小球的显示与隐藏。
						// 第二个功能：直接跳过后半场动画，让flag表示符直接变为false 
						// 当第二次再点击按钮的时候， flag flag -> true
						this.flag = !this.flag
						// el.style.opacity = 0
						
						// Vue 把一个完整的动画，是哦那个钩子函数，拆分为了两部分：
						// 我们使用 flag 标识符，来表示动画的切换；
						// 刚以开始，flag = false -> true    -> false
					}
				}
			})
		</script>
   </body>
```

- 通过before-enter 定义动画的开始部分，设置动画的起始位置。
  - 默认必须传入参数**el**
- 通过enter 定义动画效果以及终点位置、设置过度属性。调用after-enter函数
  - 默认必须传入**el **和 **done **两个参数。
  - el.offsetWidth 用来实现 过度的动画，没有它就没有动画实现的效果。
  - transform 用来实现动画最终的位置（translate(150px,450px)）。
  - transition 用来设置动画持续的时间，并且全部应用在动画效果中。
  - done() 用来实现调用after-enter 函数，这个函数主要是将小球隐藏（因为在button中已经将其显示出来，所以直接将其隐藏，方便下一次动画的触发）。
- 通过after-enter
  - 直接将动画的物体直接隐藏。

## 组件的定义方式

```html
	<body>
		<div id="app">
			<!-- <mylogin1></mylogin1> -->
			<login></login>
		</div>
		<script type="text/javascript">
			//定义组件的时候，如果要定义全局组件，Vue.component('组件的名称',组件的模板对象)
			//组件模板对象{}
			//通过 对象 自变量的形式，定义了组件模块对象。
			var login = {
				template: '<h1>1234</h1>'
			}
			// 通过 Vue.component 把组件模板对象，注册为一个全局的Vue组件，同时，为这个组件起了一个名字，可以让我们通过标签的形式，在页面中引入这个组件。
			Vue.component('mylogin1',login)
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{	
				},
				methods:{	
				},
				components:{
					// '组件的名称':{组件模板对象}
					// 'mylogin':login
					login//属性和方法的简写
				}
			})
		</script>
	</body>
```

### 全局组件
定义在非Vue实例下，通过Vue.component定义全局组件。

- 在定义的时候可以直接使用引用变量的方法定义
  - var login = { template: '<h1>1234</h1>'}
  - Vue.component('mylogin',login)
- 也可以直接定义
  - Vue.component('mylogin',Vue.extend({

        template:'<h3>这是使用Vue.extend 创建的组件</h3>'<br />      }))

  - 这样就可以实现直接定义 ，但是使用引用变量的定义方法比较方便，也方便使用！
<a name="ZgbvR"></a>
### 局部组件
在Vue实例中的components中直接定义即可：<br />   	components:{<br />   	// '组件的名称':{组件模板对象}<br />   	// 'mylogin':login<br />   	login//属性和方法的简写<br />   }

# 组件

## 父组件向子组件传值

```html
	<body>
		<div id="app">
			<!-- 父组件，我们可以在引用子组件的时候，通过属性绑定（v-bind:）的形式，把需要给传递给父组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用 -->
			<com1 v-bind:parentmsg= "msg"></com1>
		</div>
		<script type="text/javascript">
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					msg: '123 啊-父组件中的数据'
				},
				methods:{
				},
				components:{//定义局部组件，无法调用Vm实例中的data 和 methods ,其内部可以使用自己的数据和方法
					//结论：经过演示，子组件中，默认无法访问到父组件中的data数据和methods中的方法
					com1: {
						data(){//子组件中的data数据，并不是通过父组件传递过来的，而是子组件自身私有的，比如：子组件通过Ajax，请求回来的数据，都可以放到data身上
						//data中的数据，都是可读可写的；
							return {
								title:'123',
								content:'qqq'
							}
						},// 组件中的data 是一种方法，一定要注意
						
						template:'<h1 @click="change">这是子组件 --- {{parentmsg}}</h1>',
						// 组件中的所有 props 中的数据，都是通过父组件传递给子组件的。
						props:['parentmsg'],
						//props中的数据都是只读的，无法重新赋值(强制会报错！)
						//把父组件传递过来的parentmsg 属性，现在props数组中定义以下，这样，就可以解决这个问题 
						directives:{},
						components:{},
						methods:{
							change(){
								this.parentmsg = '你被修改了'
								alert("ping")
							}
						}
					}
				}
			})
		</script>
	</body>
```

- 实际使用的时候步骤还是蛮长的，但主要分为5点：
  - 1. 首先是在Vue实例中定义data 数据
  - 2. 再定义子组件
  - 3. 通过属性绑定机制v-bind将Vue实例中的数据引用过来。
    
    - <com1 v-bind:parentmsg= "msg"></com1>
  - 4. 在子组件中使用props将数据保存下来。
    - props:['parentmsg'],
    - 这个数据只可读，不能强制赋值。
  - 5. 通过template:'<h1 @click="change">这是子组件 --- {{parentmsg}}</h1>',将我们拿到的数据展示出去。

## 父组件向子组件传递方法

```html
	<body>
		<div id="app">
			<!-- 父组件向子组件传递方法 ，使用的是事件绑定机制；v-on(v-on 简写为@)，当我们自定义了一个事件属性之后，那么子组件就能够通过某种方式，来调用传递进去的这个方法了 -->
			<com2 @func = 'show'></com2>
			<!-- 这儿向外展示这个com2组件，同时它也是私有组件，也就是说在id='app'的这个范围内才能使用 -->
		</div>
		<template id="temp1">
			<!-- 这儿定义了HTML结构，定义了之后方便com2来调用 -->
			<!-- 这个HTML结构只能是一块，也就是说你里面的内容不管有多少，但是在使用的使用后必须成为一个集体（可以使用div包起来） -->
			<div>
				<h1>这是 子组件</h1>
				<input type="button" value="这是子组件中的按钮，点击它，触发父组件传递过来的func 方法" @click="myclick" />
			</div>
		</template>
		<script type="text/javascript">
			
			//定义了一个自变量类型的组件模板对象
			//这儿定义了一个组件模板
			var com2 = {
				template: '#temp1',//通过指定了一个 ID ，表示说，要取加载 这个指定的ID 的template元素中的内，当作组件的HTML结构
				// 这儿使用temp1 使用外部定义的HTML结构
				data(){
					return {
						sonmsg : {
							name:'小偷儿子',
							age: 6
						},
						// 这儿定义了结构体中的数据data 
					}
				},
				methods:{
					myclick(){
						// 当点击子组建的而按钮的时候，如何拿到父组件传递过来的func方法，并调用这个方法
						//emit 英文原意：是触发、调用、发射的意思
						// this.$emit('func',1232,456)
						this.$emit('func',this.sonmsg)
					}
				}
			}
			
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					datamsgFromSon :null
				},
				methods:{
					show(data){
						// console.log('调用了父组身上的show方法----'+ data )
						this.datamsgFromSon = data
					}
				},
				components:{
					// com2 或者可以使用com2:com2
					// 私有组件，并且调用com2来使用其定义的组件。
					com2 : com2
				}
			})
		</script>
	</body>
```

- 通过是将绑定机制v-on，将Vue实例中的方法绑定到一个自定义的名称中。
  - <com2 @func = 'show'></com2>
- 然后通过子组件中的方法触发传递来的方法。
  - this.$emit('func',this.sonmsg)
- 传递方法就跟传递值类似。都得通过子组件中的东西来触发。

## 组件案例

```html
	<body>
		<div id="app">
			<cmt-box @func = "loadComments"></cmt-box>
			<ul class="list-group">
				<li class="list-group-item" v-for="item in list" :key = 'item.id'>
					<span class="badge">评论人：{{item.user}}</span>
					{{ item.content }}
				</li>
			</ul>
		</div>
		<template id="tmp1">
			<div>
			
			<div class="form-group">
					<label >评论人：</label>
					<input type="text" class="form-control" v-model="user"/>
			</div>
			<div class="form-group">
					<label >评论内容：</label>
					<textarea class="form-control" v-model="content"></textarea>
			</div>
			<div class="form-group">
				<input type="button" value="发表评论" class="btn btn-primary" @click="postComment"/>
			</div>
			
			</div>
		</template>
		
		<script type="text/javascript">
			
			var commentBox = {
				data(){
					return{
						user:'',
						content:'',
					}
				},
				template: '#tmp1',
				methods:{
					postComment(){
						//分析：发表评论的业务逻辑
						/**
						 * 1. 数据存到哪里！存放到localStorage 中 localStorage.setItem('cmts','')
						 * 2. 先组织处一个最新的评论数据对象
						 * 3. 想办法把第二部中的得到的评论对象，保存到localStorage中
						 * 	3.1 localStorage 只支持存放字符串数据，要先调用JSON.stringify
						 *  3.2 在保存最新的评论数据之前，要先从localStorage获取到之前的评论数据（string）,转换为一个数组对象，然后把最新的评论push 到这个数组
						 *  3.3 如果获取到的 localStorage 中的评论字符串，为空不存在，则可以返回一个 '[]' 让JSON.parse去转换
						 *  3.4 把最新的列表数组，再次调用JSON.stringify 转为字符串，然后调用localStorage.setItem()*/
						var comment = {id:Date.now(),user:this.user,content:this.content}
						//从localStorage中获取所有的评论 
						var list = JSON.parse(localStorage.getItem('cmts') || '[]')
						list.push(comment)
						//保存最新的评论数据
						localStorage.setItem('cmts',JSON.stringify(list))
						this.user = this.content = ''
						
						this.$emit('func')
					}
				}
			}
			
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					list:[
						{id:Date.now(),user:'李白',content:'天生我才必有用'},
						{id:Date.now(),user:'江小白',content:'劝君更进一杯酒'},
						{id:Date.now(),user:'小马',content:'我姓马，风吹草低现牛羊的马'},
					]
				},
				beforeCreate() {
					//这里不能调用loadComments 方法，因为在执行这个钩子函数的时候，data 和 methods 都还没有被初始化
				},
				created() {
					this.loadComments()
				},
				methods:{
					loadComments(){
						//从本地的localStorage中，加载评论列表
						var list = JSON.parse(localStorage.getItem('cmts') || '[]')
						this.list = list
					}
				},
				components:{
					'cmt-box':commentBox
				}
			})
		</script>
	</body>
```

- 直接利用js来操作缓存来实现数据的交换，具体注释在文中。

# ref 获取DOM元素

- 通过Vue中的vm实例获取DOM实例

```html
	<body>
		<div id="app">
			<input type="button" value="获取元素" @click="getElement"/>	
			<h3 id="myh3" ref="myh3">哈哈哈，今天天气太好了！！！</h3>
			<hr>
			<login ref = "mylogin"></login>
		</div>
		<script type="text/javascript">
			var login = {
				template: '<h1>登陆组件</h1>',
				data(){
					return{
						msg:'son msg'
					}
				},
				methods:{
					show(){
						console.log('调用了子组件的方法')
					}
				}
			}
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					
				},
				methods:{
					getElement(){
						// console.log(document.getElementById('myh3').innerHTML)
						
						// ref是英文单词 【reference】 值类型和引用类型 【referenceError】
						// console.log(this.$refs.myh3.innerText)
						// console.log(this.$refs.mylogin.msg)
						this.$refs.mylogin.show()
						//直接调用方法
					}
				},
				components:{
					login
				}
			})
		</script>
	</body>
```

- 通过Vue提供的方法直接来获取DOM 属性，从而不直接操作DOM元素。
- 通过  this.$refs.ref名称.方法名/元素    操作其里面的方法或者元素。
- 通过ref 也可以直接调用Vue子组件中的方法。

# 路由 Vue-router

## 路由的基本使用
> 通过学习基础的路由知识，了解到路由就是我们之前在前端中使用的那些通过**a**标签链接的位置或者其他的网页！也就是监听URL的变化。


```html
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
		<!-- 1.安装 Vue-router 路由模块 -->
		<script src="./lib/vue-router%20v3.1.5.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			.router-link-active,
			.myactive {;
				color: red;
				font-weight: 800;
				font-size: 40px;
			}
			.v-enter,
			.v-leave-to{
				opacity: 0;
				transform: translateX(140px);
			}
			
			.v-enter-active,
			.v-leave-active{
				transform: all 0.5s ease;
			}
		</style>
	</head>
	<body>
		<div id="app">
			
			<!-- <a href="#/login">登录</a> -->
			<!-- <a href="#/register">注册</a> -->
			
			
			<!-- router-link 默认渲染为一个a标签 -->
			<router-link to="/login" tag="span">登录</router-link>
			<router-link to="/register">注册</router-link>
			
			
			<!-- 这是vue-router提供的元素，专门用来当作占位符的，将来，路由规则，匹配到组件中，就会展示到这个router-view中去 -->
			<!-- 所以：我们可以把router-view认为是一个占位符 -->
			<transition mode="out-in">
				<router-view></router-view>
			</transition>
			
		</div>
		
		
		<script type="text/javascript">
			var login = {
				template:'<h1>登陆组件</h1>'
			}
			var register = {
				template:'<h1>注册组件</h1>'
			}			
			
			// 2.创建一个路由对象，当导入vue-router包之后，在window全局对象中，就有了一个路由的构造函数 ，叫做VueRouter
			// 在new 路由对象的时候，可以为构造函数，传递一个配置对象
			var rouedrObj = new VueRouter({
				// route //在配置对象中route表示【路由配置规则】 的意思
				routes:[// 路由匹配规则
				// 每个路由规则，都是一个对象，这个规则对象身上，有两个必须的属性；
				//	 属性1 是path，表示监听 哪个路由的链接地址；
				//	 属性2 是component ，表示如果 路由是前面匹配到的path，则展示component 属性对印的那个组件
				// 注意：component 的属性值，必须是一个组件模板对象，不能是组件的引用名称
				// {path:'/',component:login},
				{path:'',redirect:'/login'},// 这里的 redirect 和 node 中的redirect 完全是两码事，在vue中会强制下载页面
				{path:'/login',component:login},
				{path:'/register',component:register}
				],
				linkActiveClass:'myactive'
			})
			
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					
				},
				methods:{
					
				},
				router:rouedrObj,
				// 将路由规则对象，注册到vm实例上，用来监听url地址的变化，然后展示对应的组件
			})
		</script>
	</body>
</html>
```

- 首先安装 Vue-router 路由模块。
- 在script中配置路由，也就是var rouedrObj = new VueRouter({ }).
  - routes 路由的匹配规则。
- 通过router-link 来绑定页面的触发。
- 设置特定页面的占位。
  -    <transition mode="out-in"> <router-view></router-view> </transition>
  - <transition> 用来提供过度的动画。
- 在vm实例中注册路由规则对象。（这样才能监url的变化）。

## 路由中定义参数

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
		<script src="lib/vue-router%20v3.1.5.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="app">
			<router-link to="/login/12/ls">登录</router-link>
			<router-link to="/register">注册</router-link>
			
			<router-view></router-view>
		</div>
		
		
		<script type="text/javascript">
			var login = {
				template:'<h1>登录 --- {{this.$route.params.id}} --- {{$route.params.name}}</h1>',
				data(){
					return{
						msg:'123',
						}
				},
				created(){
					console.log(this.$route.query.id)
				}
			}
			var register = {
				template:'<h1>注册</h1>'
			}
			
			var router = new VueRouter({
				routes:[
					// {path:'',redirect:'/login'},
					{path:'/login/:id/:name',component:login},
					{path:'/register',component:register}
				]
			})
			
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					
				},
				methods:{
					
				},
				router
			})
		</script>
	</body>
</html>

```

- 在路由中定义参数，还是在组件模板对象中定义，方法的使用还是在组件模板对象中使用。
- 还可以通过route中的属性，来展示相应的数据。
  - console.log(this.$route.query.id)

## 路由的嵌套

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<script src="lib/vue-router%20v3.1.5.js" type="text/javascript" charset="utf-8"></script>
	<body>
		<div id="app">
			<router-link to="/account">Account</router-link>
			
			<router-view></router-view>
		</div>
		
		<template id = "temp1">
			<div>
				<h1>这是 Account 组件</h1>
				
				<router-link to="/account/login">登录</router-link>
				<router-link to="/account/register">注册</router-link>
				<router-view></router-view>
			</div>
		</template>
		
		<script type="text/javascript">
			
			var account = {
				template: '#temp1'
			}
			
			var login = {
				template: '<h3>登录</h3>'
			}
			
			var register = {
				template: '<h3>注册</h3>'
			}
			
			var router = new VueRouter({
				routes:[
					{
						path:'/account',
						component:account,
						/* 使用children 属性，实现子路由时，子路由的path前面不要带/，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址 */
						children:[
							{path:'login',component:login},
							{path:'register',component:register}
						]
					}
				]
			})
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					
				},
				methods:{
					
				},
				router
			})
		</script>
	</body>
</html>
```

- 在路由配置中，也就是new VueRouter 中。
  - 在路由匹配规则中（routes），使用children 实现子路由。
  - 在实现子路由的时候，要注意，子路由的path 前面不要带“/”，否则永远会以根路径来时请求。
  - 不带“/”，就会在当前路径下面，相对的请求。

## 路由—实现经典布局

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
	</head>
		<script src="lib/vue-router%20v3.1.5.js" type="text/javascript" charset="utf-8"></script>
		<style type="text/css">
			
			html,body{
				margin: 0;
				border: 0;
			}
			
			.header{
				background-color: orange;
				height: 80px;
			}
			
			h1{
				margin: 0;
				padding: 0;
				font-size: 16px;
			}
			
			.container{
				display: flex;
				height: 600px;
			}
			
			.left{
				background-color: lightgreen;
				flex: 2;
			}
			
			.main{
				background-color: lightsalmon;
				flex: 8;
			}
			
		</style>
	<body>
		<div id="app">
			
			<router-view ></router-view>
			<div class="container">
				
				<router-view name="left"></router-view>
				<router-view name="main"></router-view>
				
			</div>
		</div>
		
		
		<script type="text/javascript">
			
			var header = {
				template:'<h1 class = "header">Header 头部区域</h1>'
			}
			
			var leftBox = {
				template:'<h1 class = "left">Left 侧边栏区域</h1>'
			}

			var mainBox = {
				template:'<h1 class = "main">mainBox 主体区域</h1>'
			}	
		
			// 创建路由对象
			var router = new VueRouter({
				routes:[
					// { path:'/',component:header },
					// { path:'/left',component:leftBox },
					// { path:'/main',component:mainBox },
					
					{ path:'/',components:{
						'default':header,
						'left':leftBox,
						'main':mainBox
					} }
				]
			})
			
			
			//创建Vue实例，得到ViewModel
			var vm = new Vue({
				el:'#app',
				data:{
					
				},
				methods:{
					
				},
				router
			})
		</script>
	</body>
</html>
```

- 在同一个Vm 实例下面实现页面的布局，就要用到路由，这样才可以实现相关属性的绑定，以及数据的传输。
- 首先考虑布局制定相应的样式。
- 再在页面中的相应位置留置<router-view ></router-view>。
  - 留置的router-view 就会在后面渲染页面。
  - 在必要的router-view中使用name指定相应的组件模板对象的路径，
- 创建路由对象。
  - 明确组件模板对象对应的路由地址。

**所有文件已上传**[GitHub](https://github.com/cai-xiansheng/FrontEnd)