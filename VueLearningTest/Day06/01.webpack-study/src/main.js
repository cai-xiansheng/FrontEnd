// 项目的JS入口文件
console.log('ok')

import './CSS/index.css'
import './CSS/index.scss'
// 注意:如果要通过路径的形式,引入node_modules中相关的文件,可以直接省略路径前边的node_modules这一层目录,直接写包的名称,然后跟上具体的文件路径.
// 不写 node_modules 这一层目录,默认就回去 node_modules 中去查找
// import 'bootstrap/dist/css/bootstrap.css'

// class 关键字是ES6中提供的新语法，用于实现ES6中面向对象变成的方式
class Person {
    // 使用 static 关键字，可以定义静态属性
    // 所谓的静态属性，就是可以直接通过类名，就可以访问的属性
    // 实例属性：只能通过类的实例，来访问的属性，叫做实例属性
    static info = { name:'zs', age:20}
}

// // 访问 Person 身上 info 属性
console.log(Person.info)
// 在webpack 中，默认只能处理一部分ES6的新语法，一些更高级的ES6语法或者ES7 语法，webpack 是处理不了的，这时候，就需要借助第三方的loader,来帮助 webpack 处理这些高级的语法，当第三方 loader 把高级语法转为低级语法之后，会把结果交给webpack 打包到bundle.js 中
// 通过Babel，可以将高级语法转为低级语法
// 1. 在 webpack 可以运行如下两套命令，安装两套包，去安装Babel 相关loader功能
// 1.1 第一套包：cnpm i babel-core@6 babel-loader@7 babel-plugin-transform-runtime@6 -D
// 1.2 第二套包：cnpm i babel-preset-env babel-preset-stage-0 -D
// 2. 打开webpack 的配置文件（webpack.config.js）,在 module 节点下的 rules 数组中，添加一个新的匹配规则：
// 2.1 { test:/\.js$/,use:'babel-loader',exclude:/node_modules/ }
// 2.2 注意：在配置 babel 的 loader 规则的时候，必须报 node_modules 目录，通过 exclude 选项排除掉，原因有两个：
// 2.2.1 如果不排除 node_modules ，则 Babel 会把 node_modules 中所有第三方 JS 文件都打包编译，这样会非常消耗CPU，同时，打包速度非常慢；
// 2.2.2 哪怕，最终 Babel 把所有 node_modules 中的 JS 转化完毕了，但是项目也无法正常运行！
// 3. 在项目的根目录中，新建一个叫做 .babelrc 的 babel 配置文件，这个配置文件属于 JSON 格式，所以：在      .babelrc配置的时候必须符合 JSON 语法规范，不能写注释，字符串必须用双引号
// 3.1 在 .babelrc 写如下配置：     presets :语法的意思
//         {
//             "presets": ["env","stage-0"],
//             "plugins": ["transfrom-runtime"]
//         } 
// 4. 目前我们安装的是 babel-preset-env 是比较新的ES语法插件，之前，我们安装的是 babel-preset-es2015，现在出现了新的语法插件 babel-preset-env ，它包含了所有和 es*** 相关的语法 

// ****************************************************************
        // Day 6_06 P108 Babel 安装可能会报错 babel-loader和babel-core版本不对应 
        // babel-loader 8.x对应babel-core 7.x
        // babel-loader 7.x对应babel-core 6.x
        // 如果安装的是babel-loader 8.x 请卸载旧的babel-core、babel-plugin
        // npm un babel-core
        // npm un babel-plugin-transform-runtime
        
        // 安装
        // npm i -D @babel/core
        // npm install --save-dev @babel/plugin-transform-runtime
        // npm install --save @babel/runtime
        
        // 如果第二套包也安装了 同样先卸载
        // npm un babel-preset-env
        // npm un babel-preset-stage-0
        
        // 安装新的
        // npm i @babel/preset-env
        // npm i babel-preset-mobx然后修改。babelrc文件
        // {
        // "presets": ["@babel/preset-env", "mobx"],
        // "plugins": [
        // "@babel/plugin-transform-runtime"
        // ]
        // }
// ****************************************************************




// java C# 实现面向对象的方式一样   class 是从后端语言中借鉴过来的，来实现面向对象
// var p1 = new Person()


// function Animal(name){
//     this.name = name
// }

// Animal.info = 123

// var al = new Animal('笑话')


// 这是静态属性：
// console.log(Animal.info)
// 这是实例属性：
// console.log(al.name)