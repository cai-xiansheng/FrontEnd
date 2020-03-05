## `vue`编程式导航

```text
    // 注意：一定要区分 this.$route 和 this.$router 这两个对象，
    // 其中：this.$route 是路由参数的对象，所有路由参数中，params,query 都属于它。
    // 其中：this.$router 是一个路由导航对象，用它可以方便的使用 JS 代码，实现路由的前进、后退、跳转到新的 URL 地址。

	以下的就相当于 router-link to="'/home/goodsinfo/' + item.id"
    // 1. 最简单的
    // this.$router.push('/home/goodsinfo/' + id);
    // 2. 传递对象
    // this.$router.push({path: '/home/goodsinfo/' + id});
    // 3. 传递命名的路由
    this.$router.push({ name: "goodsinfo", params: { id } });
    这儿使用到的 name 需要在写路由的时候写进去。
    示例：{ path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },

```

## 轮播图组件的封装

1. 封装好的轮播图组件存在 width 是100%还是自适应的问题
2. 因此需要传递参数，确定是否要100%，由传递的参数决定。

## 数字选择框组件的封装

1. 使用 MUI 组件中的数字选择框组件。
2. 导入 `mui` 的 JS 包。
3. 初始化数字组件，初始化数字组件的时候必须在 `mounted` 中。
4. 数据的交互：父子组件之间的传值：
	+ 父组件向子组件传值：
		- 通过属性绑定机制即可，然后在子组件中的 `props` 属性中声明传递过来的元素即可：`props: ["max"],`
		- 但是这个值由于在父组件中是异步请求的，可能存在延迟。
		- 所以使用 `watch` 属性监听 `max` ，
		- 然后按照 `mui的api` 文档中传递值要设置的对象，也就是实时更新 max 的值。
		- `mui('.mui-numbox').numbox().setOption('max',newVal);`
	+ 子组件向父组件传值：
		- 首先在父组件中，传递一个方法，通过方法的传值，将子组件的值传递到父组件。
		- 然后监测数值的变化，通过 `@change` 触发方法，然后通过 `this.$emit('getcount', parseInt(this.$refs.numbox.value));` 将值传递出来。
		- 然后通过父组件中的方法，将值及时的更新到父组件中计数的变量身上。

## 小球添加到购物车

1. 首先画出小球确定它的初始位置，然后将它放在顶层隐藏起来。
2. 然后设置一个方法，在点击加入购物车的时候触发，让小球显示出来。
3. 然后通过： `this.$refs.ball.getBoundingClientRect();` 来获取相关组件的位置。
	+ `document.getElementById('badge').getBoundingClientRect();` 这是通过 DOM 来获取的。
4. 然后设置移动的距离，这样就解决了机型无法适应的问题。

```javascript
		beforeEnter(el) {
			el.style.transform = "translate(0,0)";
		},
		enter(el,done) {
			el.offsetWidth;


			// 小球动画优化思路：
			// 1. 线分析动画不准确的本质原因：我们把小球最终移到的位置，已经局限在了某一分辨率下的滚动条为滚动的情况下；
			// 2. 只要分辨率和测试的时候不一样，或者 滚动条有一定的滚动距离之后，问题就出现了；
			// 3. 因此，得到结论：不能把位移的横纵坐标写死，而是应该根据不同情况，动态计算这个坐标值。
			// 4. 经过分析，得出解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让 y 值求差，x 值也求差，得到的结果，就是横纵坐标要位移的距离
			// 5. 如何获取徽标和小球的位置？？？   domObject.getBoundingClientRect()

			// 获取小球在页面中的位置
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			// 获取徽标在页面中的位置。
			const badgePosition = document.getElementById('badge').getBoundingClientRect();

			const xDist = badgePosition.left - ballPosition.left;
			const yDist = badgePosition.top - ballPosition.top;

			el.style.transform = `translate(${xDist}px, ${yDist}px)`;
			el.style.transition = 'all 0.5s ease';
			done();
		},
		afterEnter(el) {
			const ballPosition = this.$refs.ball.getBoundingClientRect();
			this.ballFlag = !this.ballFlag;
			el.style.transform = `translate(${ballPosition.left}px, ${ballPosition.top}px)`;
		},
```

## `vuex`

```javascript
// 入口文件
import Vue from 'vue'
// 配置vuex的步骤
// 1. 运行 cnpm i vuex -S 
// 2. 导入包
import Vuex from 'vuex'
// 3. 注册vuex到vue中
Vue.use(Vuex)

// 4. new Vuex.Store() 实例，得到一个 数据仓储对象
var store = new Vuex.Store({
  state: {
    // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
    // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
    count: 0
  },
  mutations: {
    // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
    increment(state) {
      state.count++
    },
    // 注意： 如果组件想要调用 mutations 中的方法，只能使用 this.$store.commit('方法名')
    // 这种 调用 mutations 方法的格式，和 this.$emit('父组件中方法名')
    subtract(state, obj) {
      // 注意： mutations 的 函数参数列表中，最多支持两个参数，其中，参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；
      console.log(obj)
      state.count -= (obj.c + obj.d)
    }
  },
  getters: {
    // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，如果想要修改 state 中的数据，请 去找 mutations
    optCount: function (state) {
      return '当前最新的count值是：' + state.count
    }
    // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
    // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
  }
})

// 总结：
// 1. state中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2. 如果组件想要直接 从 state 上获取数据： 需要 this.$store.state.***
// 3. 如果 组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称'， 唯一的一个参数)
// 4. 如果 store 中 state 上的数据， 在对外提供的时候，需要做一层包装，那么 ，推荐使用 getters, 如果需要使用 getters ,则用 this.$store.getters.***


import App from './App.vue'

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  store // 5. 将 vuex 创建的 store 挂载到 VM 实例上， 只要挂载到了 vm 上，任何组件都能使用 store 来存取数据
})
```