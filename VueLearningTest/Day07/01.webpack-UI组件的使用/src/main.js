import Vue from 'vue'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter
Vue.use(VueRouter)


// 导入 bootstrap 样式
// import 'bootstrap/dist/css/bootstrap.css' 
import './CSS/app.css'

// 导入所有的 MintUI 组件
// 导入 mint-ui
import MintUI from 'mint-ui' // 把所有的组件都导入进来
// 这里可以省略 node_modules 
import 'mint-ui/lib/style.css'
// 将 MintUI 安装到 Vue 中
// 安装：cnpm i mint-ui -save
Vue.use(MintUI)




import 'mint-ui/lib/style.css'
// 按需导入 Mint-UI 组件
import { Button } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
Vue.component('mybtn', Button)


// 导入 app 组件
import app from './app.vue'

// 导入自定义路由模块
import router from './router.js'



var vm = new Vue({
	el:'#app',
	render: c => c(app), // render 会把 el 指定的容器中，所有的内容都清空覆盖，所以不要把路由的 router-view 和 router-link 直接写到 el 所控制的元素中去
	router // 4. 将路由对象挂载到 vm 上
})

// 注意：App 这个组件是通过 VM 实例的 render 函数渲染出来的，render 函数如果要渲染组件，渲染出来的组件只能放到 el : '#app' 所指定的 元素中；
// Account 和 GoodsList 组件，是通过路由监听到的，所以这两个组件，只能展示到属于路由的 <router-view></router-view> 中去；