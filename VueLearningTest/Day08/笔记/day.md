# `Promise`解决地狱回调

## 读取文件
```javascript
const fs = require('fs')
const path = require('path')

function getFileByPath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr) => {
    // 如果报错，进入 if 分支后，if 后面的代码就没有必要执行了
    if(err) callback(err)
    // console.log(dataStr)
    // return dataStr
    callback(null,dataStr)
  })
}

getFileByPath(path.join(__dirname,'./files/1.txt'),(dataStr) => {
  // console.log(dataStr)
  if (err) return console.log(err.message)
  console.log(dataStr)
})
```
1. 在读取文件的时候需要用到：readFile(fpath,'utf-8',function)
2. 在这儿需要传递读取文件的路径，文件的编码格式，对内容判断的处理。
3. 如果按照这种方式写出来的在使用过程中如果要按次序读取多个文件，就只能循环嵌套读取，这样就会多次调用同一个方法，并且直到最后一个文件处理结束之后才能调用结束。这样并不方便。

## `Promise`是干什么的？

> Promise 就是单纯的为了解决地狱回调的问题。

## `Promise`是什么？
1. Promise 是一个构造函数，既然是构造函数，那么我们就可以 new Promise() 得到一个 Promise 实例；
2. 在 Promise 上，有两个函数，分别叫 resolve (成功之后回调函数) 和 reject (失败之后的回调函数)
3. 在 Promise 构造函数的 Prototype 属性，有一个 .then() 方法，也就是说，只要是 Promise 构造函数创建的实例，都可以访问到 .then() 方法
4. Promise 表示一个异步操作；每当我们 new 一个 Promise 的实例，这个实例，就表示一个具体的异步操作；
5. 既然 Promise 创建的实例，是一个异步操作，那么这个异步操作的结果，只能有两种状态：
5.1 状态1：异步执行`成功`，需要在内部调用成功的回调函数 `resolve` 把结果返回给调用者；
5.2 状态2：异步执行`失败`，需要在内部调用失败的回调函数 `reject` 把结果返回给调用者；
5.3 由于 Promise 创建的实例，是一个异步操作，所以，内部拿到操作的结果后，无法使用 return 把操作的结果返回给调用者，这时候，只能使用回调函数的形式，来把成功或失败的结果，返回给调用者；
6. 我们可以在 new 出来的 Promise 实例上，调用 .then() 方法，【预先】为这个 Promise 异步操作，指定成功（resolve） 和失败（reject） 回调函数。

```javascript
const fs = require('fs')

function getFileByPath(fpath) {
  return new Promise(function (resolve, reject){
    fs.readFile(fpath,'utf-8',(err,dataStr) => {
      
      if (err) return reject(err)
      resolve(dataStr)

    })
  })
}


// 读取文件1
// 在上一个.then中，返回一个Promise头例，可以继续被下一个.then 来处理

// 如果，前面的 Promise 执行失败，我们不想让后续的 Promise 操作被终止，可以为每个 Promise 指定失败的回调
getFileByPath('./files/11.txt')
  .then(function(data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./files/2.txt')
  },function (err){
    console.log('这是失败的结果：' + err.message)
    // return 一个新的 Promise
    return getFileByPath('./files/2.txt')
  })
    .then(function (data) {
      console.log(data)

      // 读取文件3
      return getFileByPath('./files/3.txt')
    })
      .then(function (data){
        console.log(data)
      })

getFileByPath('./files/1.txt')
  .then(function(data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./files/2.txt')
  })
  .then(function (data) {
    console.log(data)

    // 读取文件3
    return getFileByPath('./files/3.txt')
  })
  .then(function (data){
    console.log(data)
  })
  .catch(function (err){
    console.log(err.message)
  })
```
1. 上面有两种的 Promise 的方法：
2. 第一种是，异常情况每一步都有自己的处理方案，不会影响下一步。
3. 第二种是，异常情况全部靠最后的 `.catch(function(err){})` 来解决。

> Promise 解决了处理过程中方法中重复调用的问题，它也有完善的方法可以来解决正常 resolve(err) 和异常 reject(data) 。

# `git`需要关注的两个问题

## 问题1：解决不必要文件的过滤上传

在`.gitignore`中添加不需要上传的文件。

```
node_modules
.idea
.vscode
.git
```

## 问题2：开源协议

[主流开源协议之间有什么区别](https://www.zhihu.com/question/25079718)

> 以下是`MIT`协议

```
The MIT License (MIT)

Copyright (C) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```


# `Vue` 中常用的几个插件

> 在使用插件之前都需要导入 vue 。

## 过滤器
```javascript
<script>
	// 导入格式化时间的插件
    import moment from 'moment'
    // 定义全局的过滤器
    Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss") {
        return moment(dataStr).format(pattern)
    })
</script>
```
1. 定义的全局过滤器在实际使用的过程中还是非常有用的，这点需要注意。
2. Vue.filter('过滤器名称',function(传入的数据 , 输出的文件格式) { 处理 })
3. moment :一个处理时间格式的插件；方便使用，可以减少之前繁琐的代码。


## `vue-resource`

```javascript

// 2.1 导入 vue-resource
// cnpm i vue-resource -S
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
```

1. 根路径的使用，在服务器更新之后都可以快速更换，解决了逐个更改的尬境。

## `vue-router`

```javascript
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'


// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'



// 3. 创建路由对象
var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: HomeContainer },
		{ path: '/member', component: MemberContainer },
		{ path: '/shopcar', component: ShopcarContainer },
		{ path: '/search', component: SearchContainer },
		{ path: '/home/newslist', component: NewsList },
		{ path: '/home/newsinfo/:id', component: NewsInfo },
	],
	linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})


// 把路由对象暴漏出去
export default router
```
1. 可以把 `router` 独立的封装成一个 JS ，这样也方便管理。
2. 路由以及子路由的使用，解决了多页面之间跳转的问题。


## 自定义组件的使用`.vue`

```vue
<template>
	<div>

    </div>
</template>

<scrip>
export default {

}
</scrip>

<style lang='scss' scoped>

<style>

```

1. 处理好的组件可以重复使用，比如评论区。
2. 样式基本上内部吸收了。这样可以解决样式污染，但是在使用 `scss` 的时候很少会出现样式污染的问题。只要按层级写下来，每个组建的意义可以在 `class` 中体现出来。

## 父子组件之间传值
#### 父组件向子组件传值
传统方法传值：
1. 在父组件调用子组件的时候 `:id="this.id"`
2. 在子组件中 `props: ["id"]`
3. 这样就可以获得父组件传递过来的值。

还可以通过路由传值：
1. 在路由中`{ path: '/home/newsinfo/:id', component: NewsInfo }`
2. 在父组件中 `<router-link :to="'/home/newsinfo/' + item.id">`
3. 在子组件中 data 中 `id: this.$route.params.id,`

#### 子组件向父组件传值
[blog](https://www.cnblogs.com/padding1015/p/7878741.html)
博主的文章写的很详细。


# 数据处理以及绑定会出现的问题

## 数据的请求以及处理

1. 数据通过 `get` 或者 `post` 请求回来，首先判断返回信息是都正确。
2. 然后将数据存储到 data 属性中。
3. 以及数据存储过程中数据的累积：`this.message = this.message.concat(this.result.message)`

## 数据渲染的唯一性

> v-for="item in newslist" :key="item.id"

1. 在将 `data` 中数据渲染到页面上时，需要关注数据的唯一性，以确保数据的增删正确。
2. 设置 `:key="唯一的数据"`

## 数据请求的时机

> created( ) {  要请求数据的方法  },

一般的数据请求必须在这儿完成，这样才可以跟上页面处理的速度。








