<template>
<!-- 问题：我们不知道什么时候能够拿到 max 的值，但是，总归有那么一刻，会得到一个真正的 max 值 -->
<!-- 我们可以使用 watch 属性监听，来监听父组件传递过来的值，不管watch被触发几次，但是，最后一次，肯定是一个合法 max 值 -->
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>

</template>

<script type="module">
import mui from '../../lib/mui/js/mui.min.js'

export default {
	mounted() {
		// 初始化数字选择框组件
		mui("mui-numbox").numbox();
	},
	methods: {
		countChanged() {
			// 每当文本框的数据被修改以后，立即把最新的数据，通过事件调用，传递给父组件
			// console.log(this.$refs.numbox.value);
			this.$emit('getcount', parseInt(this.$refs.numbox.value));
		}
	},
	props: ["max"],
	watch: {
		// 属性监听
		'max': function(newVal,oldVal){
			// 使用 JS API 设置 numbox 的最大值。
			mui('.mui-numbox').numbox().setOption('max',newVal);
		}
	}
}
</script>

<style lang="scss" scoped>
	
</style>