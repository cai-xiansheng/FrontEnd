## [主流开源协议之间有什么区别](https://www.zhihu.com/question/25079718)



## 制作首页 APP 组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabber.html
 + 在制作购物车小图标的时候，操作会相对多一些：
 + 首先扩展图标的 css 样式，拷贝到项目中
 + 拷贝扩展字体库 ttf 文件，到项目中
 + 为购物车小图标，提娜佳如下样式： `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件


## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，使用vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，保存到 data 身上
4. 使用 v-for 渲染每个 item 项


## 改造 九宫格 区域的样式

## 改造新闻资讯路由链接

##  新闻咨询页面绘制
1. 绘制界面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link ，同时，在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块中，将新闻详情的路由地址和组件页面对应起来


## 实现新闻详情的页面布局和数据渲染


## 单独封装一个 comment.vue 评论子组件

1. 先创建一个 单独的 comment.vue 组件模板

2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件

 + `import comment from './comment.vue'`

3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件

4. 将注册子组件时候的，注册名称，以 标签形式，在页面中 引用即可



## 获取所有的评论数据显示到页面中

## 实现点击加载更多评论的功能

1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据

2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法重新获取最新一页的数据

3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组


## 发表评论
1. 把文本框做双向数据绑定。
2. 未发表按钮绑定一个时间
3. 校验评论内容是否为空，若为空，则 Toast 提示用户，评论区内容不能为空。
4. 通过 vue-resource 发送一个请求，把评论的内容交给服务器。
5. 当发表评论 OK 后，重新书信列表，以查看最新的评论。
+ 如果调用 getComments 方法重新刷新评论列表的话，可能只能看到最后一页的评论，前几页的评论获取不到
+ 换一种思路：当评论成功后，在客户端手动拼接出一个新的评论对象，然后调用数组的 unshift 方法，把罪行的评论追加到 data 中的 comments 的开头。

## 改造图片分析按钮为路由的链接，并显示其对应的组件页面。

## 绘制图片列表组件页面结构并美化
1. 直走顶部的滑动条。
2. 制作底部的图片列表。

### 制作顶部滑动条的坑们：
1. 需要借助于 MUI 中的 tab-top-webview-main.html 
2. 需要把 slider 区域的 mui-fullscreen 类去掉。
3. 滑动调无法正常滑动，通过检查官方文档，发现这是 JS 组件，需要被初始化。
	+ 导入 mui.js
	+ 调用官方提供的方式去初始化：
	```
	mui('.mui-scroll-wrapper).scroll({
		deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值为0.0006
		0.0006
	});
	```
4. 我们在初始化滑动条的时候，导入了 mui.js ，但是报错了。mui.min.js:1697 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them	
 + 经过我们的推测，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' ，但是 webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以这两者冲突了。
 + 解决方案：
 	1. 把 mui.js 中的非严格模式的代码改掉，但是不现实；
	2. 把 webpack 打包的时候的严格模式禁用掉。
	3. 最终我们选择了一处严格模式：使用插件：babel-plugin-transform-remove-strict-mode
5. 刚进入图片分享页面的时候，经过我们的分析，发现，如果要初始化滑动条，必须要等到 DOM 元素加载完，所以，我们把初始化滑动条的代码搬到了 mounted 生命周期函数中。
6. 当滑动条调试 ok 之后，发现 tabbar 无法正常工作，这时候，我们把每个 tabbar 按钮的样式中 'mui-tab-item' 重新改一下名字。
7. 获取所有的分类列表：

	    "ignore": ["./lib/mui/js/mui.js"]
			"@babel/plugin-transform-runtime",
			"transform-remove-strict-mode"
			["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]


### 制作图片列表区
1. 图片列表需要使用懒加载结束，我们可以使用 Mint-UI 提供的现成的组件 'lazy-load'
2. 根据 'lazy-load' 的使用文档，尝试使用。
3. 渲染图片列表数据。

### 实现了图片列表的懒加载改造和样式美化

## 实现 点击图片跳转到图片详情页面
1. 在改造 li 为 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素。

## 实现详情页面的布局和美化，同时获取数据页面。
1. 使用插件 vue-preview 这个缩略图软件
2. 获取到所有的图片列表，然后使用 v-for 指令渲染。
3. 注意：img 标签上的 class 不能去掉
4. 注意：每个图片数据对象中必须有 w 和 h
[vue-preview的使用](https://www.cnblogs.com/ldq678/p/10917355.html)

## 绘制商品列表页面基本结构并美化

## 尝试在自己的手机上去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证手机和开发项目的电脑在同一个 WiFi 下面，也就是说手机能访问到电脑的 IP 
3. 打开自己的项目中 package.json 文件中，在 dev 脚本中，添加一个 --host 指令，把当前电脑的 WiFi IP 地址设置为 --host 的指令；
 + 查自己电脑的 IP