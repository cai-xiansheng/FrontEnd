<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to="'/home/newsinfo/' + item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{ item.title }}</h1>
						<p class='mui-ellipsis'>
							<span>发表时间：{{ item.add_time | dateFormat }}</span>
							<span>点击：{{ item.click }}次</span>
						</p>
					</div>
				</router-link>
			</li>
	



		</ul>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
	data(){
		return {
			newslist: [
			] // 新闻列表
		}
	},
	created() {
		this.getNewsList();
		// this.getNewsList();
	},
	methods:{
		getNewsList(){
			this.$http.get('api/getnewslist').then(result => {
				if(result.body.status === 0){
					// 如果没有失败，应该把数据保存到 data 上
					this.newslist = this.newslist.concat(result.body.message);
				}else{
					Toast('获取新闻列表失败！')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.mui-table-view{
	li{
		h1{font-size: 14px}

		.mui-ellipsis{
			font-size: 12px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
				// 通过上面这两个样式，可以实现两个 span 标签的左右分布
		}
	}
}
</style>