<template>
	<div class="photoinfo-container">
		<h3>{{ photoinfo.title }}</h3>
		<p class="subtitle">
			<span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
			<span>点击：{{ photoinfo.click }}次</span>
		</p>
	

		<hr>

		<!-- 缩略图区 -->
		<vue-preview :slides="slide1" ></vue-preview>

		<!-- 图片内容区 -->
		<div class="content" v-html="photoinfo.content">

		</div>
		<!-- 放置一个评论子组件 -->
		<cmt-box :id = this.id></cmt-box>

	</div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
	data() {
		return {
			id: this.$route.params.id, // 从路由中获取到的图片 ID
			photoinfo: [], // 图片详情
			slide1: [],
		}
	},
	created() {
		this.getPhotoInfo();
		this.getThumbs();
	},
	methods: {
		getPhotoInfo() {
			// 获取图片详情
			this.$http.get('api/getimageInfo/' + this.id).then( result => {
				if (result.body.status === 0) {
					this.photoinfo = result.body.message[0];
					// console.log(result.body);
					// console.log(this.$route);
				}
			})
		},
		getThumbs() {
			this.$http.get( 'api/getthumimages/' + this.id ).then( result => {
				if (result.body.status === 0) {
					// 循环每个图片，补全图片的宽和高。
					result.body.message.forEach(item => {
						item.msrc = item.src;
						item.w = 600;
						item.h = 400;
					});
					// 把完整的数据保存到 list 中去。
					this.slide1 = result.body.message;
				}
			})
		}
	},
	components: { // 注册评论子组件
		'cmt-box': comment
	}
}
</script>

<style lang="scss">

.photoinfo-container{
	padding: 3px;
	h3 {
		color: #26A2FF;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;
	}
	.subtitle {
		display: flex;
		justify-content: space-between;
		// 这两个是常用的 C3 样式
		font-size: 13px;
	}
	figure{
		display: inline-block;
		margin: 10px;
		img{
			width: 100px;
			height: 100px;
		}
	}
	.content {
		font-size: 13px;
		line-height: 30px;
	}
}

</style>