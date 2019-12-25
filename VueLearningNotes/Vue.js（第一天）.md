Vue.js：[📎vue.js](https://www.yuque.com/attachments/yuque/0/2019/js/657552/1576914039187-72be9c8b-2290-4c5f-8fd3-c9af00a3d414.js)

参考文档：[Vue.js](https://cn.vuejs.org/v2/guide/)

## vue基本代码结构



```
            var vm = new Vue({
                el : '#app',//表示，当前new的 Vue 实例，要控制页面上的那个区域
                //这里的data就是MVVM中的M,专门用来保存每个页面的数据
                data : { //data属性中，存放的是el中要用到的数据
                    msg : '欢迎学习！' ,//通过vue提供的指令，很方便的就能把数据渲染到页面上，程序员不在手动操作dom元素了。
                }
            });
```

## vue插值表达式、v-cloak、v-text、v-html



```
        <div id="app">
            <!-- 使用v-clock能够解决表达式闪烁的问题 -->
            <p v-cloak>{{msg}}---------</p>
                <!-- {{}} 这就是插值表达式 -->
            <h4 v-text="msg">--------</h4>
            <!-- 默认v-text 是没有闪烁问题的 -->
            <!-- v-text会覆盖元素原本的内容，但是 插值表达式 指挥替换自己的这个占位符，不会把整个元素的内容全部替换掉 -->
            
            
            
            <div>{{msg2}}</div>
            <div v-text="msg2"></div>
            <!-- v-text跟插值表达式差不多，但是插值表达式只会替换占位符，不会把整个元素内容全部替换掉！但是v-text就会将整个元素内部的问题全部替换掉 -->
            <div v-html="msg2">
                123
            </div>
            <!-- v-html会直接替换整个元素内部的东西，并且输出为html -->
            
        </div>
        <script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript">
            var vm = new Vue({
                el:'#app',
                data:{
                    msg : '123',
                    msg2 : '<h1> hha,我是一个大大的h1<h1>'
                }
            })
        </script>
```

- v-text ：它替换了插值表达式，但是它会替换元素整个内容。
- v-html ：它会将内容输出为html格式！
- v-clock ：能够解决表达式闪烁的问题。

## Vue中v-bind



```
            <input type="button" value="按钮" v-bind:title="mytitle + '123'" />
            <!-- v-bind: 是vue中，提供的用于绑定属性的指令 -->
            <!-- 注意：v-bind：指令可以被简写为：要绑定的属性 -->
            <!-- v-bind中，可以写成合法的JS表达式 -->
```

- v-bind  Vue提供的属性绑定机制  缩写是 :
- v-bind 在绑定的时候，拼接绑定内容： :title = "btnTitle + ',这是追加的内容'"

## Vue中v-on



```
            <!-- vue中提供了v-on：事件绑定机制 -->
            <input type="button"  value="按钮" v-on:mouseover="show" />
        <script type="text/javascript">
            var vm = new Vue({
                el:'#app',
                data:{
                    msg : '123',
                    msg2 : '<h1> hha,我是一个大大的h1<h1>',
                    mytitle : '这是一个自己定义的属性',
                    
                },
                methods:{
                    //这个methods属性中定义了当前vue中实例所有可用的方法
                    show: function(){
                        alert('hello!');
                    }
                }
            })
        </script>
```

- v-on  Vue提供的事件绑定机制  缩写是 @ 
- v-on show中绑定了show中的事件！

## Vue中.stop



```
<!-- 使用 .stop阻止冒泡机制 -->
    <div class="inner" @click="divHandler">
        <input type="button" value="戳他" @click.stop="btnHandler"/>  
    </div>
```

- 冒泡机制：这就是在执行内部事件的时候，执行完内部事件然后去执行外部事件，直到事件执行完。（.stop也就是阻止这一过程的发生，也就是只执行所触发的本次事件，不会牵连到其他事件）
- .stop会阻止冒泡从这一层开始的所有事件

## Vue中的.prevent



```
<!-- 使用 .capture 实现捕获触发事件的机制 -->
    <!-- 捕获触发事件就是从外向内执行，也就点击里面的按钮，先执行外边div里边的，然后再执行buttom里面的。
        他所指的捕获就是捕获外边的事件！
    -->
    <div class="inner" @click.capture="divHandler">
        <input type="button" value="戳他" @click="btnHandler"/>   
    </div>
```

- 捕获触发事件的机制：事件从外向内执行。

## Vue中的.self



```
<!-- 使用 .self 实现只有点击当前元素的时候，才会触发事件的处理函数 -->
    <!-- .self只会阻止自己身上冒泡行为的触发，并不会真正阻止冒泡的行为 -->
    <div class="inner" @click.self="divHandler">
        <input type="button" value="戳他" @click="btnHandler"/>   
    </div>
```



- 触发的当前事件：只会触发当前事件，不会影响周围的事件。

## Vue中的.once



```
<!-- 使用 .once 只触发一次事件 -->
<a href="http://www.baidu.com" @click.prevent.once="linkClick">有问题，先去百度</a> 
```



- 保证这个事件只触发一次

## Vue中的v-model（双向数据绑定）



```
<!-- 使用v-model 指令，可以实现数据表单元素 和Model中数据的双向元素 -->
<!-- 注意：v-model 只能运用在表单元素中 -->
<!-- 表单元素：input(radio,text,address,email……) select  checkbox    textarea-->
<input type="text" v-model:value="msg" style="width: 100%;"/>
```

## Vue中使用样式

> 使用v-bind属性绑定机制



```
<head>
        <meta charset="utf-8">
        <title></title>
        <script src="lib/vue.js" type="text/javascript" charset="utf-8"></script>
        
        <style type="text/css">
            .red{
                color: #FF0000;
            }
            
            .thin{
                font-weight: 200;
            }
            
            .italic{
                font-style: italic;
            }
            
            .active{
                letter-spacing: 0.5em;
                /* 只对中文有用 */
            }
        </style>
        
    </head>
    <body>
        <div id="app">
            <!-- v-bind 属性绑定机制       简写为 :-->
            
            <!-- <h1 class="red thin">这是一个很大的H1</h1> -->
            
            
            <!-- 第一种使用方式，直接传递一个数组，注意：这里的class需要使用v-bind做数据绑定 -->
            <h1 :class="['red','thin']">这是一个很大的H1</h1>
            
            
            <!-- 在数组中使用三元表达式 -->
            <h1 :class="['red','thin','italic',flag?'active':'']">这是一个很大的H1</h1>
            
            
            <!-- 在数组中使用对象代表三元表达式，提高代码的可读性 -->
            <h1 :class="['red','thin','italic',{'active' : flag}]">这是一个很大的H1</h1>
            
            
            
            <!-- 在为class使用v-bind 绑定对象（属性）的时候，对象的属性是类名，由于 对象的属性给可带引号
             也可不带引号，所以 这里我没写引号； 属性的只是一个标识符-->
            <h1 :class="classObj">这是一个很大的H1</h1>
            
        </div>
        <script type="text/javascript">
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    flag : true,
                    classObj : {red : true,thin : true,italic : false,active : false},
                },
                methods:{
                    
                }
            })
        </script>
    </body>
```



- 

  第一种使用方式，直接传递一个数组，注意：这里的class需要使用v-bind做数据绑定

> :class="['red','thin']"

- 在数组中使用三元表达式

> :class="['red','thin','italic',flag?'active':'']"

- 在数组中使用对象代表三元表达式，提高代码的可读性

> :class="['red','thin','italic',{'active' : true}]"

- 在为class使用v-bind 绑定对象（属性）的时候，对象的属性是类名，由于 对象的属性给可带引号,也可不带引号，所以 这里我没写引号； 属性的只是一个标识符

> :class="{red : true,thin : true,italic : false,active : false}"

## Vue使用内联样式



```
<div id="app">
        
        
        <!-- 对象就是无序键值对集合 -->
        <!-- 键值对中存在-的必须使用''包裹起来，例如'font-weight' -->
        <!-- <h1 :style="{color:'red','font-weight':200}">这是一个H1</h1> -->
        
        
        <!-- 在data中定义样式 -->
        <!-- <h1 :style="styleObj1">这是一个H1</h1> -->
        
        <!-- 通过数组，引用多个样式对象 -->
        <h1 :style="[styleObj1,styleObj2]">这是一个H1</h1>
        
        
    </div>
    
    
    <script type="text/javascript">
        //创建Vue实例，得到ViewModel
        var vm = new Vue({
            el:'#app',
            data:{
                styleObj1 : {color:'red','font-weight':200},
                styleObj2 : {'font-style' : 'italic'}
            },
            methods:{
                
            }
        })
    </script>
```



- 对象就是无序键值对集合

> :style="{color:'red','font-weight':200}"

- 在data中定义样式

> :style="styleObj1"	在data中已经定义了 styleObj1 : {color:'red','font-weight':200},

- 通过数组，引用多个样式对象

> :style="[styleObj1,styleObj2]"	在data中已经定义了styleObj1 : {color:'red','font-weight':200},styleObj2 : {'font-style' : 'italic'}

## Vue中v-for



```
<p v-for="item,i in list">索引值：{{i}}---每一项：{{item}}</p>
data:{
    list : [1,2,3,4,5,6]
},
<!--************这是分界线***************-->
<p v-for="user,i in list">ID:{{user.id}}----name:{{user.name}}----索引：{{i}}</p>
data:{
    list : [
        {id : 1,name : 'zhang1'},
        {id : 2,name : 'zhang2'},
        {id : 3,name : 'zhang3'},
        {id : 4,name : 'zhang4'},
    ]
},
<!--************这是分界线***************-->
<!-- 注意:在遍历对象绳上的键值对的时候，除了 由 val,key，在第三个位置还有一个索引 -->
<p v-for="val,key,i in user">键：{{key}}---值：{{val}}----索引：{{i}}</p>
data:{
    user : {
        id : 1,
        name : '托尼·世达克',
        gender : '男',
    },
},
<!--************这是分界线***************-->
<!-- in 后边我们放过普通数组，对象数组，对象，还可以放数字 -->
<!-- 注意：如果使用v-for迭代数字的时候，前边的count值从1开始 -->
<p v-for="count in 10">这是第 {{count}} 次循环</p>
```



- v-for 就类似于python中的for类似，但是需要注意的是数据存储在data中。
- in 后边我们放过普通数组，对象数组，对象，还可以放数字
- 注意：在遍历对象上的键值对的时候，除了 由 val,key，在第三个位置还有一个索引
- 注意：如果使用v-for迭代数字的时候，前边的count值从1开始

### v-for循环中key属性的使用

```
<body>
        <div id="app">
            
            <div>
                <label>Id:
                    <input type="text" v-model="id" />
                </label>
                
                <label>Name:
                    <input type="text" v-model="name"/>
                </label>
                
                <input type="button" value="添加" @click="add"/>
            </div>
            
            
            
            <!-- 注意：v-for循环的时候，key属性只能使用number获取string -->
            <!-- 注意：key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值 -->
            <!-- 在组件中，使用v-for循环的时候，或者在一些特殊情况下，如果v-for有问题，必须在使用 
            v-for的同时之地那个唯一的字符出或数字，类型：key值-->
            <p v-for="item in list" :key = 'item.id'>
                <input type="checkbox"/>{{item.id}} ---- {{item.name}}
            </p>
        </div>
        
        
        <script type="text/javascript">
            //创建Vue实例，得到ViewModel
            var vm = new Vue({
                el:'#app',
                data:{
                    id : '',
                    name : '',
                    list : [
                        { id : 1,name : '李斯'},
                        { id : 2,name : '李斯2'},
                        { id : 3,name : '李斯3'},
                        { id : 4,name : '李斯4'},
                    ],
                },
                methods:{
                    add(){//添加方法 push
                        this.list.unshift({id:this.id,name:this.name})
                    }
                }
            })
        </script>
    </body>
```



- 注意：v-for循环的时候，key属性只能使用number获取string
- 注意：key在使用的时候，必须使用v-bind属性绑定的形式，指定key的值
- 在组件中，使用v-for循环的时候，或者在一些特殊情况下，如果v-for有问题，必须在使用 v-for的同时之地那个唯一的字符出或数字，类型：key值

[📎01.Vue基本代码.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914123868-1ebb7318-9703-49b2-a182-2b4e8341ef7e.html)

[📎02.v-cloak的学习.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914134032-9f49faa8-b176-4a38-93b7-6bd0c29b1b97.html)

[📎03.跑马灯效果.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914140936-abee2d71-f79b-4336-9fd6-6f65d4425a70.html)

[📎04.事件修饰符.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914157844-f2a29e8f-f794-478b-970d-2ff50abbd83e.html)

[📎05.v-model.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914165344-259d85bf-c50f-45d8-86dc-f07856d46c78.html)

[📎06.简易的计算器.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914185586-b45e3ebe-e652-428b-a622-ee031921cfdb.html)

[📎07.vue中样式-class.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914193274-fbfe66ec-78a4-4026-bcef-3921950e5373.html)

[📎08.vue中内联样式.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914236153-c4ee5db0-071a-444e-9dc1-a6c9049471f3.html)

[📎09.v-for循环普通数组.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914243016-c748f709-9249-48d0-9810-0fb568f0c34f.html)

[📎10.v-for循环对象数组.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914259955-a797370e-83df-457a-92b2-930ccd7014af.html)

[📎11.v-for循环对象.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914267164-9b4c1fa6-37a2-40b9-9b9a-9a91bf10e354.html)

[📎12.v-for迭代数字.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914277031-881c33e1-4d42-4f99-93ae-69306e1a1631.html)

[📎13.v-for循环中key属性的使用.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914288590-8c98501e-a447-4352-bcf3-5f333fd8a789.html)

[📎14.v-if和v-show的使用.html](https://www.yuque.com/attachments/yuque/0/2019/html/657552/1576914296447-21fcdf9c-14de-49f7-8849-34f93fda1fa8.html)

**
**

**所有文件已上传**[GitHub](https://github.com/cai-xiansheng/FrontEnd)