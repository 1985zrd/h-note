# html-15 LESS css预处理器
## 一、预处理
CSS 预处理器定义了一种新的语言，其基本思想是，用一种专门的编程语言，为 CSS 增加了一些编程的特性，将 CSS 作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。
使用CSS预处理器语言,可以让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。
目前CSS 预处理器技术已经非常的成熟，而且也涌现出了很多种不同的CSS 预处理器语言，其中比较优秀的有LESS、Sass（SCSS）等等
Less 包含一套自定义的语法及一个解析器，用户根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 CSS 文件,只有在被编译后才能够被浏览器识别使用。预处理编译工具koala



## 二、基本语法
1. 注释
less有两中注释风格：
a.标准的注释风格：/**/，会保留到编译后的文件。
b.单行注释：// 不会保留到编译后的文件。

2. koala有两种编译方式：
normal 按照完整格式编译
compress 压缩编译模式，多余的不显示。


3. import 导入样式
引入样式有两种方式：
a.引入css文件：@import "css文件路径"，空格和后缀名不能省略。
b.直接引入less文件：@import "style"，引入less文件可以省略扩展名。
编译后倒入的文件会和当前文件内容合并。


4. 可以定义变量。
a.变量以@开头，变量名与变量值之间用冒号隔开，
好处是更换风格方便。直接修改变量名的值就可以了。
使用变量直接@变量名，修改变量名可以直接修改被使用的属性值，编译之后直接是16进制的文件。

b.变量可以使用字符串，使用时必须在@之后加{}; //不常用
@side : left; border-@{side}: 5px solid black;
c.变量可以使用图片路径,使用路径时需要添加引号。
 @images: "../img"; background: url("@{images}/white-sand.png");


5. 嵌套使用
5.1.选择器的嵌套：
可以在父元素选择器里面直接写子元素选择器嵌套使用，编译后的css文件会按照标准格式显示出来。
5.2.在嵌套的代码块内，可以使用&引用父元素，
选择器里面还可以嵌套自己本身，用&引用自己。
 


6. 混入在一个class中引入另一个定义好的class，直接增加另外一个class的属性。
6.1. 定义一些通用的属性为一个class，使用的时候直接.class名;。


```css
.bordered {    
    border-top: dotted 1px black;
    border-bottom: solid 2px black;
}
```
调用：
a{
   color: #111;
   .bordered;
} 编译后会自动给a标签加入上面定义的属性。


    

6.2. 混入参数，

```css
.bordeRadius (@radius:20px) {
     -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
     -o-border-radius:@radius;
     -ms-border-radius:@radius;
     border-radius: @radius; 
}
```
//前面是类名，括号里面是变量值，用来传值的; //调用时直接使用调用类名的方式，如果有给类名设置默认值， //直接就是默认值的值，需要修改里面的值可以直接括号写值。 //编译后直接加入类名里面的代码


6.3 @arguments变量，代表所有参数。
```css
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
-moz-box-shadow: @arguments;
-webkit-box-shadow: @arguments;
box-shadow: @arguments;
}
```
//前面写类名，括号里面写用到的值,前面加@属性名，多个用逗号隔开。 //如果需要写默认值，需要用冒号隔开。
```css
.box{
 .box-shadow(2px, 5px); 
} 
编译后： 
.box {
 -moz-box-shadow: 2px 5px 1px #000000;
 -webkit-box-shadow: 2px 5px 1px #000000;
 box-shadow: 2px 5px 1px #000000; 
}
```


6.4. extend
  extend伪类来实现样式的继承使用
直接写类名，会将类名里面所有的属性加入选择器里面的属性。
写了extend伪类之后，编译之后会将该组合选择类名的组加入到一起，其他单独元素另起一个类名写。
好处是少了很多行代码。



7. 运算
LESS支持一些算术运算，例如加号(+)，减号( - )，乘法(*)和除法(/)的操作 只需写好表达式，编译时会计算结果; less会为你自动推断数值的单位，所以不必每一个值都加上单位 注意：涉及优先级时以()进行优先级运算




8. 函数
转换颜色、处理字符串合进行算术运算的函数。
8.1. 颜色：lighten() 减淡，darken()加深

```css
.bg_light {
   height: 100px;
   background: lighten(rgb(255, 0, 0), 20%);
}
.bg_darken {   
    height: 100px;
   background: darken(blue, 20%)
}
```
8.2. percentage 将浮点数转换为百分比字符串。
参数：number- 一个浮点数。 返回： string (字符串) 代码示例

```css
.main{
    width:percentage(100px/200px);
};
编译为css:
.main {
    width: 50%;
};
```
