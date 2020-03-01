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
				duration: 5000,
				position: 'top',
				iconClass: 'icon icon-success', // 设置图标的类
				className: 'mytoast' // 自定义 Toast 样式，需要自己提供一个类名
			})
		}
	}
}

</script>

<style>

</style>