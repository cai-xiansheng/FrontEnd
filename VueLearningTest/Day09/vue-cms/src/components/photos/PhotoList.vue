<template>
	<div>
		<!-- 顶部滑动条 -->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item' , item.id === 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
						<!-- item.id === 0 ？ 'mui-active' : ''  这是为了给 全部 设置为初始为亮 -->
						{{ item.title }}
					</a>

				</div>
			</div>
		</div>

		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag='li' >
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{ item.title }}</h1>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>


	</div>
</template>

<script>
// 1.导入 MUI 的 JS 
import mui from '../../lib/mui/js/mui.js'


export default {
	data() {
		return {
			cates: [], // 所有分类的代表
			list: [], // 图片列表的数组。
		};
	},
	created() {
		this.getAllCategory();
		// 默认进入页面加载全部，也就是分类id为0的。
		this.getPhotoListByCateId(0);
	},
	mounted(){ // 当组件中的 DOM 结构被渲染好，并放置好后，就会执行这个钩子函数。
		// 2. 初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
	methods: {
		getAllCategory() {
			// 获取所有的图片分类
			this.$http.get('api/getimgcategory').then(result => {
				if (result.body.status === 0) {
					// 手动拼接出一个最完整的列表分类
					result.body.message.unshift({ title: "全部", id: 0 });
					this.cates = result.body.message;
				}
			})
		},
		getPhotoListByCateId(cateId) {
			// 根据分类 Id 获取图片列表
			this.$http.get('api/getimages/' + cateId).then( result => {
				if (result.body.status === 0) {
					this.list = result.body.message;
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
 * { touch-action: pan-y; } 
//  使用全局样式样式去掉

.photo-list {
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 6px #999;
		position: relative;
		img {
			width: 100%;
			vertical-align: middle;
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}

		.info {
			color: #ffffff;
			text-align: left;
			position: absolute;
			bottom: 0;
			background-color: rgba( 0, 0, 0, 0.4);
			max-height: 84px;
			.info-title {
				font-size: 14px;
			}
			.info-body {
				font-size: 13px;
			}
		}
	}
}
</style>