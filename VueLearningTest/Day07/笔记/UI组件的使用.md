# UI组件

## Mint-UI

当我们一听到 XX UI 就可以知道它是一个界面相关的框架，玩过前端的人至少听说过 Bootstrap「它是 Twitter 开源的一个 css/html 工具包」, 而 Mint UI 是饿了么团队开源的一款基于 Vue.js 的移动端组件库.

[Mint-UI使用文档](https://cloud.tencent.com/developer/section/1489959)

### Mint-UI 的引入

```text
将所有组件导入：
import MintUI from 'mint-ui' // 把所有的组件都导入进来
// 这里可以省略 node_modules
import 'mint-ui/lib/style.css'
// 将 MintUI 安装到 Vue 中
// 安装：cnpm i mint-ui -save
Vue.use(MintUI)

按需导入 Mint-UI 组件
import 'mint-ui/lib/style.css' // 导入样式包。
import { Button } from 'mint-ui'
// 使用 Vue.component 注册按钮组件
Vue.component('mybtn', Button)
```

### Mint-UI 的使用
在[Mint-UI使用文档](https://cloud.tencent.com/developer/section/1489959)中查阅相关的样式引入，做简单的更改即可！


```vue
<template>
	<div>
		<h1>这是 App 组件</h1>

		<!-- 为什么这里叫做 mt-button 的 button 直接就能用 -->
		<mt-button type="danger" icon="more" @click="show">default</mt-button>

		<mt-button type="danger" size="large" plain>default</mt-button>

		<mt-button type="danger" size="small" disabled>default</mt-button>

		<mybtn>123</mybtn>


		<router-link to="/account">Account</router-link>
    <router-link to="/goodslist">GoodsList</router-link>

    <router-view></router-view>
	</div>
</template>

<script>

// 按需导入 Toast 组件
import { Toast } from 'mint-ui';

export default {
	data(){
		return {
			toastInstanse: null
		};
	},
	created(){
		this.getList();
	},
	methods:{
		getList(){
			// 模拟获取数据的一个 Ajax 方法
			// 在获取数据之前，立即弹出 Toast 提示用户正在加载。
			this.show();
			setTimeout(() => {
				// 当三秒过后，数据获取回来了，就要把 Toast 移除
				this.toastInstanse.close();
			},3000)
		},

		show(){
			// Toast('提示信息');
			var toastInstanse = Toast({
				message: "这是消息",
				duration: 5000, // 时间
				position: 'top', // 位置
				iconClass: 'icon icon-success', // 设置图标的类
				className: 'mytoast' // 自定义 Toast 样式，需要自己提供一个类名
			})
		}
	}
}

</script>

<style>

</style>
```
+ 这儿是一个`Mint-UI`组件的使用。
+ 具体细节参考官方文档。


## MUI

MUI是一套前端框架，由DCLOUD公司研发而成，提供大量H5和js语言组成的组件，大大提高了开发效率，可以用于开发web端应用、web app等应用。

[MUI官方文档](https://dev.dcloud.net.cn/mui/ui/)

### MUI 使用

1. 从`GitHub`clone。
2. [MUI的GitHub地址](https://github.com/dcloudio/mui)
3. 在参考示例中找到自己合适的内容，截取代码片段即可，或者直接在[MUI官方文档](https://dev.dcloud.net.cn/mui/ui/)寻找自己相关的内容。
4. 所有要使用的的文件都必须在`main.js`文件中引入。
5. 主要将`dist`目录中的`CSS、JS、fonts`导入。

## npm 安装过程中的几个安装参数
```text
-D (development)	会在项目内安装。会在package.json 中留下记录
-S (save)	不会再package.json 中留下记录
-G (globe)	全局安装
```