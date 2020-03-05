<template>
	<div class="shopcar-container">
		<div class="goods-list">
			

			<!-- 商品列表 -->
			<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelect[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelect[item.id])"></mt-switch>
						<img :src="item.thumb_path">
						<div class="info">
							<h3>{{ item.title }}</h3>
							<p>
								<span class="price">￥{{ item.sell_price }}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
								<!-- 如何从购物车中获取商品的数量 -->
								<!-- 1. 我们可以先创建一个空对象，然后循环购物车中所有的商品，把当前循环这条商品的 ID ，作为对象的属性名，count值作为对象的属性值，这样把所有的商品循环一遍，就会得到 一个对象：{ 88: 2. 89:3 } -->
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>


			<!-- 结算区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
							<p>总计（不含运费）</p>
							<p>已勾选商品 <span class="red">{{ this.$store.getters.getGoodsCountAndAmout.count
}}</span> 件，总价：<span class="red">￥{{ this.$store.getters.getGoodsCountAndAmout.amount
}}</span> </p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>

			<p>{{ $store.getters.getGoodsSelect }}</p>

	</div>
</template>

<script>

import numbox from '../subcomponents/shopcar_numbox.vue'

export default {
	data() {
		return {
			goodslist: [], //购物车中所有商品的数据。
		}
	},
	created() {
		this.getGoodsList();
	},
	methods:{
		getGoodsList() {
			// 1. 获取到 store 中所有的商品的id, 拼接出一个用，分割的字符串
			var idArr = [];
			this.$store.state.car.forEach(item => {
				idArr.push(item.id);
			});
			// 如果购物车中没有商品，呢么直接返回，不需要进行接口请求，否则会报错
			if(idArr.length <= 0) {
				return;
			}
			// 获取商品列表
			this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result =>{
				if( result.body.status === 0) {
					this.goodslist = result.body.message;
				}
			});
		},
		remove(id,index) {
			// 点击删除，把商品从 store 中根据传递的 ID 删除，同时，把当前 组件中的 goodslist 中，要删除的那个商品，使用 index 来删除。
			this.goodslist.splice(index,1);
			this.$store.commit("removeFormCar", id)
		},
		selectedChanged(id, val){
			// 每当点击开关，把最新的状态，同步到 store 中
			console.log(id + "-----" + val)
			this.$store.commit('updateGoodsSelected', { id, selected: val});
		}
	},
	components: {
		numbox,
	}
}
</script>


<style lang="scss" scoped>

.shopcar-container{
	background-color: #eee;
	overflow: hidden;
	.goods-list{
		.mui-card-content-inner{
			display: flex;
			align-items: center;
		}
		img{
			width: 60px;
			height: 60px;
		}
		h3{
			font-size: 13px;
		}
		.info{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.price{
				color: red;
				font-weight: bold;
			}
		}
	}
	.jiesuan{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.red{
			color: red;
			font-weight: bold;
			font-size: 16px;
		}
	}
}

</style>