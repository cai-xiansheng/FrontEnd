<template>
	<div>
		<!-- 轮播图区域 -->
		<mt-swipe :auto="4000">
			<!-- 在组件中，使用v-for循环的话，一定要使用 key -->
			<!-- 将来谁使用轮播图谁为我们传递 lunbotuList -->
			<!-- 此时， lunbotuList 应该是父组件向子组件传值来设置。 -->
			<mt-swipe-item v-for="item in lunbotuList" :key="item.url">
				<img :src="item.img_url" alt="" :class="{'full': isfull}">
			</mt-swipe-item>
		</mt-swipe> 
	</div>

	<!-- 分析：为什么商品评论中的轮播图那么丑： -->
	<!-- 1. 首页中的图片，他的宽和高都是使用了 100% 的宽度 -->
	<!-- 2. 在商品详情页面中，如果宽高也 100% ，页面不好看  -->
	<!-- 3. 商品详情页里面的轮播图中期望的高度是 100% ，但是宽度为自适应 -->
	<!-- 4. 经过分析，得到问题的原因：首页中的轮播图和详情页中的轮播图，分歧点是宽度到底是 100% 还是自适应 -->
	<!-- 5. 既然这两个轮播图其他方面都是没有冲突的，只是宽度有分歧，那么我们可以定义一个属性，让使用轮播图的调用者，手动指定 宽度 -->


</template>

<script>

export default {
	props: ["lunbotuList","isfull"]
}

</script>

<style lang="scss" scoped>
.mint-swipe{
	height: 200px;

	.mint-swipe-item{
		// background-color: red;
		text-align: center;

		img{
			// width: 100%;
			height: 100%;
		}
	}
}

.full{
	width: 100%;
}
</style>