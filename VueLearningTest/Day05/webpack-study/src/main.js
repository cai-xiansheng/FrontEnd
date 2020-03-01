// 这是 main.js 是我们项目的JS文件

// 1.导入jQuery
// import ** from *** 是ES6中导入模块的方式
// 由于ES6的代码，太高级了，浏览器解析不了，所以这一行代码会执行报错。
import $ from 'jquery'
// const $ = require('jquery');

// 使用 import 语法，导入css 样式表
import './CSS/index.css'
import './CSS/index.less'
import './CSS/index.scss'
// 注意： webpack ，默认只能打包处理 JS 类型的文件，无法处理其他的非 JS 类型的文件；
// 如果非要处理非 JS 类型的文件，我们需要手动安装一些合适的第三方 loader 加载器；
// 1. 如果想要打包处理 css 文件，需要安装 npm i style-loader css-loader -D
// 2. 打开 webpack.config.js 这个配置文件，在里面新增一个配置节点，叫做 module ，它是一个对象；在这个 modlue 对象身上，有个 rules 属性，这个 rules 数组；这个数组中，存放了所有第三方文件的匹配和处理规则。


// 注意： webpack 处理第三方文件类型的过程：
// 1. 法相这个要处理的文件不是JS 文件，然后去配置文件中，查找有没有对应的第三方 loader 规则
// 2. 如果能够调用对应的规则，就会调用对应的 loader 处理这种类型的文件
// 3. 在调用loader 的时候，是从后往前调用的。
// 4. 当最后的一个 loader 调用完毕，会把处理的结果，直接交给webpack 进行打包合并，最终输出到 bundle.js 中去


$(function(){
    $('li:odd').css('backgroundColor','yellow'),
    $('li:even').css('backgroundColor',function(){
        return '#' + 'D97698'
        // 这也是一个颜色，是不过是十六进制的。跟上面的一样。
    })

})

// 经过刚才的延时，webpack可以做什么？？？
// 1. webpack 能够处理JS文件的相互依赖关系；
// 2. webpack 能够处理JS的兼容问题，把高级的、浏览器不能识别的语法，转为低级的浏览器可以识别的语法。

// 刚才运行的命令格式： 【webpack 要打包的文件的路径 打包好的输出文件路径 】  但是这个是webpack3 中的。
// webpack .\src\main.js-o .\dist\bundle.js --mode=development 这是webpack4 中的。


// 使用 webpack-dev-server 这个工具，来实现自动打包编译的功能
// 1. 运行npm i webpack-dev-server -D 把这个工具安装到项目的本地开发环境依赖
// 2. 安装完毕后，这个工具的用法个webpack 命令完全一样！
// 3. 由于，我们是在项目中本地安装的 webpack-dev-server ,所以无法把它当作脚本命令在powershell终端中直接运行；（只有那些安装到全局 -g 的工具们，才能在终端中正常运行）。
// 4. 注意： webpack-dev-server这个工具，如果想要正常运行，要求，在本地项目中，必须安装webpack
// 5. webpack-dev-server 帮我们打包生成的 bundle.js 文件，并没有存放在实际的物理磁盘中，而是直接托管到了电脑的内存中，多以，我们在项目根目录中，根本找不到打包好的 bundle.js ；
// 6. 我们可以认为 webpack-dev-server 把打包好的文件，以一种虚拟的形式，托管到了我们项目中的根目录中，虽然我们看不到它，但是，我们可以认为，和dist src node_modules 平级，有一个看不见的文件，叫做bundle.js
// 7. 启动 webpack-dev-server npm run dev