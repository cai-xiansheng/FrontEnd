## `MUI` 中的滑动条
1. 首先导入 `mui.js`
	+ `import mui from '../../lib/mui/js/mui.js'`
2. 然后在 `mounted(){}` 中初始化滑动控件
```javascript
	mounted(){ // 当组件中的 DOM 结构被渲染好，并放置好后，就会执行这个钩子函数。
		// 2. 初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
```

3. 去除严格模式：安装两个插件
	+ `@babel/plugin-transform-modules-commonjs`
	+ `@babel/plugin-transform-strict-strict-mode`
4. 去除严格模式：然后在 `.babelrc` 中添加：
	+ `"plugins": ["@babel/plugin-transform-modules-commonjs",{"strictMode": false}],`
5. 在 `style` 中 `* { touch-action: pan-y; }`
6. 由于滑动组件的 JS 中出现底部 tabbar 不能转换，这是由于样式存在了冲突。
	+ 所以改变 `.mui-tab-item` 类名，也就是将它的所有样式重新书写一遍（将这个类面下的样式复制出来，然后再将 `.mui-tab-item` 改变，再次带入即可）。

    ```javascript
        // 该类名解决 tabbar 点击无法切换的问题
        // 就是将 .mui-tab-item 改成 .mui-tab-item-lib ，然后再将 app.vue 中的样式  .mui-tab-item 改成 .mui-tab-item-lib 
    .mui-bar-tab .mui-tab-item-lib.mui-active {
        color: #007aff;

    }

    .mui-bar-tab .mui-tab-item-lib {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;

    }

    .mui-bar-tab .mui-tab-item-lib .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .mui-bar-tab .mui-tab-item-lib .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;

    }
    ```

## 图片的懒加载

1. 图片列表需要使用懒加载结束，我们可以使用 Mint-UI 提供的现成的组件 'lazy-load'
2. 根据 'lazy-load' 的使用文档，尝试使用。
3. 渲染图片列表数据。

## [vue-preview的使用](https://www.cnblogs.com/ldq678/p/10917355.html)

1. vue-preview 是一个缩略图插件
2. 对 `msrc` 的样式改变在
```javascript
	figure{
		display: inline-block;
		margin: 10px;
		img{
			width: 100px;
			height: 100px;
		}
	}
```

3. 像这类没有明确样式的元素中，直接先运行，然后通过检查找样式。

## 尝试在自己的手机上去进行项目的预览和测试
1. 要保证自己的手机可以正常运行；
2. 要保证手机和开发项目的电脑在同一个 WiFi 下面，也就是说手机能访问到电脑的 IP 
3. 打开自己的项目中 package.json 文件中，在 dev 脚本中，添加一个 --host 指令，把当前电脑的 WiFi IP 地址设置为 --host 的指令；
 + 查自己电脑的 IP