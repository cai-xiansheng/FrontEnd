const path = require('path')
// 启用热更新的第 2 步
const webpack = require('webpack')
//  npm i html-webpack-plugin -d
// 导入在内存中生成HTML 页面中的插件
// 只要是插件，都一定要放到 plugins 节点中去
// 这个插件的两个作用：
// 1. 自动在内存中根据指定页面生成一个页面生成一个内存中的页面。
// 2. 自动把打包好的 bundle.js 追加到页面中去。
const htmlWebpackPlugin = require('html-webpack-plugin')

// 这个配置文件，起始是一个JS文件，通过Node 中的操作模块，向外暴漏一个 配置对象。
module.exports = {
    mode:'development' ,// 设置mode

    entry:
    {
        main:'./src/main.js',  //入口，表示要使用的webpack 打包哪个文件
    },
    output:{// 输出文件相关配置
        path:path.resolve(__dirname,'./dist'),// 指定 打包好的文件，输出到哪个目录中去
        filename:'bundle.js'// 这是 指定输出的文件的名称
    },
    devServer:{ // 这是配置dev-server 命令参数的第二种形式，相对来说这种方式麻烦一些
        // --open --port 3000 --contentBase src --hot
        open:true,// 自动打开浏览器
        port:3000,// 这只启动的时候的运行端口。
        contentBase:'src',// 指定托管的根目录
        hot:true // 启用热更新  de 第一步
    },
    plugins:[ //配置插件的节点
        new webpack.HotModuleReplacementPlugin(), // new 一个热更新的模块对象，这是启用哦那个热更新的第三步
        new htmlWebpackPlugin({ // 创建一个在内存中生成的HTML页面插件。
            template:path.join(__dirname,'./src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' // 指定生成的页面的名称
        })
    ],
    module:{ // 这个节点，用于配置所有的第三方模块加载器。
        rules:[ // 所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']}, // 配置处理 .css 问文件的第三方loader 规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']}, // 配置处理 .less 文件的第三方包 loader 规则
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']}, // 配置处理 .scss 文件的第三方loader 规则
        ]
    }
}

// 当我们在，控制台名直接输入webpack 做了以下几步：
// 1. 首先，webpack发现，我们并没有通过命令的形式，给它指定入口和出口
// 2. webpack 就会去项目的根目录中，查找一个叫‘webpack.config.js’的配置文件
// 3. 当找到配置文件之后，webpack 会去解析执行这个配置文件，当解析执行完后，就得到了配置文件中导出的配置文件对象。
// 4. 当webpack 拿到配置对象后，就拿到了配置文件中指定的入口和出口，然后进行打包构建。