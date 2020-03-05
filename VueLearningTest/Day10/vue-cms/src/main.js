import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

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
})