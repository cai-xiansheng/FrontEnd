<template>
	<div>

		<!-- 轮播图区域 -->
		<swiper :lunbotuList=this.lunbotuList :isfull="true"></swiper>

		<!-- 九宫格到六宫格 -->
				<!-- <div class="mui-content"> -->
			<ul class="mui-table-view mui-grid-view mui-grid-9">
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<router-link to="/home/newslist">
							<img src="../../images/menu1.png" alt="">
									<div class="mui-media-body">新闻资讯</div></router-link></li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<router-link to="/home/photolist">
							<img src="../../images/menu2.png" alt="">
								<div class="mui-media-body">图片分享</div></router-link></li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
						<router-link to="/home/goodslist">
							<img src="../../images/menu3.png" alt="">
								<div class="mui-media-body">商品购买</div></router-link></li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu4.png" alt="">
									<div class="mui-media-body">留言反馈</div></a></li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu5.png" alt="">
									<div class="mui-media-body">视频专区</div></a></li>
					<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu6.png" alt="">
									<div class="mui-media-body">联系我们</div></a></li>
				<!-- 注意：在使用 webpack 打包的时候会把照片打包成[object module]，所以我们需要在 webpack.config.js 中 url.loader 下面添加 esModule = false  【可以参照:https://www.zhangshengrong.com/p/JKN8BBdg16/】 -->
			</ul> 
		<!-- </div> -->


	</div>
</template>

<script>

import { Toast } from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'


export default {
	data(){
		return{
			lunbotuList: [] // 保存轮播图的数组
		}
	},
	created(){
		this.getlunbotu();
	},
	methods:{
		getlunbotu(){ // 获取轮播图数据的方法
			this.$http.get("api/getnewslist").then(result => {
				// console.log(result.body);
				if (result.body.status == 0) {
					// 成功了
					this.lunbotuList = result.body.message;
				} else {
					// 失败的
					Toast('加载轮播图失败！');
				}
			})
		}
	},
	components: {
		swiper
	}
}
</script>


<style lang="scss" scoped>


.mui-grid-view.mui-grid-9 {
	background-color: #fff;
	border: none;
	img {
		width: 60px;
		height:60px;
	}
	.mui-media-body {
		font-size: 13px;
	}
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
	border: 0;
}


</style>