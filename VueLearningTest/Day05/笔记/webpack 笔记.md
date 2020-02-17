# webpack

## 网页中引入静态资源多了以后会引起什么问题？？？

1. 网页加载速度慢，因为我们要发起很多二次请求
2. 要处理错综复杂的依赖关系。


## 如何解决以上这两个问题：

1. 合并、压缩、精灵图、图片的Base64编码
2. 可以使用之前学过的requireJS、也可以使用webpack解决各个包之间复杂的依赖关系。
3. 所有操作都是为了解决用户的体验，提高网页加载速度，解决二次请求。

## `webpack`什么是 ？

1. webpack 是前端项目构建工具，它是基于Node.js 开发出来的一个前端工具。
2. webpack 是基于整个项目进行构建的。

## `webpack` 打包构建.

+ webpack 能够处理JS文件的相互依赖关系；
+ webpack 能够处理JS的兼容问题，把高级的、浏览器不能识别的语法，转为低级的浏览器可以识别的语法。

> 在文档主目录下新建一个`main.js`——这儿用来导入相关的js，css 文件

##### 在文档主目录下新建一个 `webpack.config.js` 文件

+ 这个配置文件，起始是一个JS文件，通过Node 中的操作模块，向外暴漏一个 配置对象
+ 在这儿确定了打包的入口和出口地址。
	- enter 确定了要打包的文件
	- output 规定了打包好文件要输出到哪个文件中去，以及指定输出的文件的名称。


```javascript
const path = require('path')

module.exports = {
    mode:'development' ,// 设置mode 
		// mode 有两种模式	development 开发模式	production	生产模式
    entry:
    {
        main:'./src/main.js',  //入口，表示要使用的webpack 打包哪个文件
    },
    output:{// 输出文件相关配置
        path:path.resolve(__dirname,'./dist'),// 指定 打包好的文件，输出到哪个目录中去
        filename:'bundle.js'// 这是 指定输出的文件的名称
    }
}
```

#### `webpack`安装

1. webpack 是基于node.js 运行的。
2. webpack 安装前提条件是必须安装node.js。
3. node.js 下载路径——[node下载](https://nodejs.org/en/)
4. 通过`npm`全局安装`-g`webpack
5. 安装命令：`cnpm i webpack -g`

#### `webpack`初始化

1. `npm init -y`
2. 在这儿会在文档的主目录下新建一个`package.json`

#### `webpack`处理js类文件

+ webpack 默认只能打包处理 JS 文件，无法处理非 JS 文件。
+ 需要导入哪类 JS 文件，只需要通过控制台导入相关的 JS 文件即可！
+ 导入JS `cnpm i 【js文件名】 -d`
 - cnpm 得通过 npm 安装.
 - npm 是node.js版本中自带的.
+ 通过`npm` 导入之后，在 main.js 中通过 `import $ from 'JS文件名'` 引入。

#### 直接进行文件打包

+ 运行的命令格式： 【webpack 要打包的文件的路径 打包好的输出文件路径 】  但是这个是webpack3 中的。
+ `webpack .\src\main.js-o .\dist\bundle.js --mode=development` 这是webpack4 中的。

#### 经过以上处理之后就可以直接使用 `命令:webpack` 直接进行打包

+ 当我们在，控制台名直接输入webpack 做了以下几步：
+ 首先，webpack发现，我们并没有通过命令的形式，给它指定入口和出口
+ webpack 就会去项目的根目录中，查找一个叫‘webpack.config.js’的配置文件
+ 当找到配置文件之后，webpack 会去解析执行这个配置文件，当解析执行完后，就得到了配置文件中导出的配置文件对象。
+ 当webpack 拿到配置对象后，就拿到了配置文件中指定的入口和出口，然后进行打包构建。

#### `webpack`处理CSS文件

```text
使用 import 语法，导入css 样式表
import './CSS/index.css'
import './CSS/index.less'
import './CSS/index.scss'
注意： webpack ，默认只能打包处理 JS 类型的文件，无法处理其他的非 JS 类型的文件；
如果非要处理非 JS 类型的文件，我们需要手动安装一些合适的第三方 loader 加载器；
 1. 如果想要打包处理 css 文件，需要安装 `npm i style-loader css-loader -D`
 2. 打开 webpack.config.js 这个配置文件，在里面新增一个配置节点，叫做 module ，它是一个对象；在这个 	modlue 对象身上，有个 rules 属性，这个 rules 数组；这个数组中，存放了所有第三方文件的匹配和处理规则。
```
```javascript
module.exports = {
   module:{ // 这个节点，用于配置所有的第三方模块加载器。
        rules:[ // 所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']}, // 配置处理 .css 问文件的第三方loader 规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']}, // 配置处理 .less 文件的第三方包 loader 规则
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}, // 配置处理 .scss 文件的第三方loader 规则
        ]
    }
}
```

## 使用 `webpack-dev-server` 工具，来实现自动打包编译的功能

#### 在`package.json`中实现

1. 运行`npm i webpack-dev-server -D` 把这个工具安装到项目的本地开发环境依赖
2. 安装完毕后，这个工具的用法个webpack 命令完全一样！
3. 由于，我们是在项目中本地安装的 webpack-dev-server ,所以无法把它当作脚本命令在powershell终端中直接运行；（只有那些安装到全局 -g 的工具们，才能在终端中正常运行）。
4. 注意： webpack-dev-server这个工具，如果想要正常运行，要求，在本地项目中，必须安装webpack
5. webpack-dev-server 帮我们打包生成的 bundle.js 文件，并没有存放在实际的物理磁盘中，而是直接托管到了电脑的内存中，多以，我们在项目根目录中，根本找不到打包好的 `bundle.js` ；
6. 我们可以认为 webpack-dev-server 把打包好的文件，以一种虚拟的形式，托管到了我们项目中的根目录中，虽然我们看不到它，但是，我们可以认为，和`dist`  `src`  `node_modules `平级，有一个看不见的文件，叫做bundle.js
7. 在`package.json`中的`script`中添加这个就可以开启自动打包`"dev2": "webpack-dev-server --open --port 3000 --contentBase src --hot"`
	+ `--open` 自动打开浏览器
	+ `--port 300` 启动的时候的运行端口
	+ `contentBase src` 指定托管的目录
	+ `--hot` 启用热更新
8. 启动 webpack-dev-server:`npm run dev`

#### 在`webpack.config.js`中配置`dev-server`

```js
const webpack = require('webpack')
// 启用热更新的第 2 步
module.exports = {
	    devServer:{ // 这是配置dev-server 命令参数的第二种形式，相对来说这种方式麻烦一些
        // --open --port 3000 --contentBase src --hot
        open:true,// 自动打开浏览器
        port:3000,// 这只启动的时候的运行端口。
        contentBase:'src',// 指定托管的根目录
        hot:true // 启用热更新  de 第一步
    },
    plugins:[ //配置插件的节点
        new webpack.HotModuleReplacementPlugin() // new 一个热更新的模块对象，这是启用哦那个热更新的第三步
    ]
}
```

## 使用`html-webpack-plugin`插件

```javascript
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins:[ //配置插件的节点
        new htmlWebpackPlugin({ // 创建一个在内存中生成的HTML页面插件。
            template:path.join(__dirname,'./src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' // 指定生成的页面的名称
        })
    ],
}
```

+ ` npm i html-webpack-plugin -d`
+ 导入在内存中生成HTML 页面中的插件
+ 只要是插件，都一定要放到 plugins 节点中去
+ 这个插件的两个作用：
	+ 自动在内存中根据指定页面生成一个页面生成一个内存中的页面。
	+ 自动把打包好的 bundle.js 追加到页面中去。
+ 这么处理之后，在html中就不需要    `<script src="/bundle.js"></script>`








