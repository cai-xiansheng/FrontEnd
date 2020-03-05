import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)




// 注册 vuex 
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站的时候，肯定会调用 main.js 在刚调用的时候，先从本地中把购物车的数据读出来。
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: { //this.$store.state.***
        car: car //将购物车中的数据用一个数组存储一下，在 car 数组中，存储一下商品的对象，咱们可以吧商品的对象设计成这样 { id:商品的id,count:要购买的数量,price:商品的价格,select: false}
    },
    mutations: { //this.$store.commit('方法的名称','按需传递的唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品的信息保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前已经有对应的商品了，那么只需要更新数量
            // 2. 如果没有，则直接把商品的数据 push 到 car 中即可。
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })

            // 如果循环完毕，得到的结果还是 false ，直接将商品加入到购物车 car 中去。
            if (!flag) {
                state.car.push(goodsinfo)
            }


            // 当更新到 car 之后，把 car 数组存储到本地的 localStorage 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中数量值。
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })

            // 当修改完数量，把最新的购物车数量存储到本地的 localStorage 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            // 根据 id ，从 store 中的购物车中删除对应的那条商品数据
            state.car.some((item, i) => {
                    if (item.id == id) {
                        state.car.splice(i, 1)
                        return true;
                    }
                })
                // 将删除完毕后的，最新的购物车数据，同步到本地存储中。
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                    if (item.id == info.id) {
                        item.selected = info.selected
                    }
                })
                // 将删除完毕后的，最新的购物车状态，同步到本地存储中。
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        // 相当于计算属性，也相当于 filters 
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelect(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmout(state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0 // 勾选的数量。
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})






// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})






// 2.1 导入 vue-resource
// cnpm i vue-resource -S
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
    // 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';

// 全局设置 post 时候的表单数据格式组织形式		application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;




// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 导入样式
// import 'mint-ui/lib/style.css'
// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);


// 全部导入 Mint-UI
import MintUI from 'mint-ui'
Vue.use(MintUI);
import 'mint-ui/lib/style.css'


// 安装图片预览插件
import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)
    // with parameters install
    // Vue.use(VuePreview, {
    //     mainClass: 'pswp--minimal--dark',
    //     barsSize: { top: 0, bottom: 0 },
    //     captionEl: false,
    //     fullscreenEl: false,
    //     shareEl: false,
    //     bgOpacity: 0.85,
    //     tapToClose: true,
    //     tapToToggleControls: false
    // })



// 1.3 导入自己的 router.js 路由模块
import router from './router.js'




// 导入 App 文件
import app from './app.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 1.4 挂载路由对象到 VM 实例上
    store // 挂载 store 状态管理组件
})