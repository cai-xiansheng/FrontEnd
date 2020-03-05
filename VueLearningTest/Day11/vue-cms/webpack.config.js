// 由于 webpack 是基于node.js 进行构建的，所以：webpack的配置文件中所有合法的node代码都是支持的。
var path = require('path')
    // 在内存中，根据指定的模板页面，生成一份在首页中，同时把打包好的bundle注入到页面底部
    // 如果要配置插件，需要在到处的对象中，挂载一个plugins节点。
var htmlWebpackPlugin = require('html-webpack-plugin')

var VueLoaderPlugin = require('vue-loader/lib/plugin');

// 当以命令形式运行 webpack 或者 webpack-dev-server 的时候，工具会发现我们并没有提供要打包的入口和出口文件，此时 ，会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个配置对象，然后根据这个对象，进行打包构建。
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, './src/main.js'), // 项目的入口地址
    output: {
        // 指定输出选项。
        path: path.join(__dirname, './dist'), // 输出路径
        filename: 'bundle.js' // 指定输出文件的名称
    },
    plugins: [ // 所有 webpack 插件的配置节点
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定模板的文件路径
            filename: 'index.html' // 设置生成内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 配置所有第三方 loader 模块的
        rules: [ // 第三方模块的匹配规则
            // cnpm i style-loader css-loader -D
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理css 文件的loader
            // cnpm i less-loader less -D
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理less 文件的loader
            // cnpm i sass-loader node-sass sass fibers -D
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader'] }, // 处理less 文件的loader
            // cnpm i url-loader file-loader -D
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=100000&name=[name].[ext]&esModule=false' }, // 处理土坯墙按路径的loader
            // limit 给定的值是图片的大小,单位是byte,如果我们引用的图片大于或者等于limit的值则不会转为base64格式的字符串,如果图片小于给定的limit的值,则会被转为base64格式的字符串
            // name=[hash:8]-[name].[ext] 在这儿是为了控制文件的名称,不发生变化,还有文件后缀.
            // 注意：在使用 webpack 打包的时候会把照片打包成[object module]，所以我们需要在 webpack.config.js 中 url.loader 下面添加 esModule = false  【可以参照:https://www.zhangshengrong.com/p/JKN8BBdg16/】
            { test: /\.(ttf|eot|svg|woof|woof2)$/, use: 'url-loader' }, // 处理字体文件
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, //配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的loader
        ]
    },
    resolve: {
        alias: { // 修改 vue 被导入时候的包的路径
            "vue$": "vue/dist/vue.js"
        }
    }
}