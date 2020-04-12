# js-06 定时器、时间、Math
一、定时器
1、`setTimeout(函数，时间(毫秒))`;
只执行一次，不用加单位，单位是毫秒；
清楚Timeout定时器：clearTimeout(定时器);


2、`setInterval(函数，时间(毫秒))`;
间歇性执行，每隔相同的时间执行一次；
常用于倒计时；清除：`clearInterval(定时器)`;
每个定时器开启的时候，都有一个自己的id数字，如果需要清除定时器，则需要清除定时器的id； 返回值就是定时器的id值；
定时器如果不清除，会一直占用内存，可以设置一个变量，用来保存这个定时器，之后设置一个清除定时器的方法；

3、`requestAnimationFrame()` IE10+   不需要设置间隔，会自动调用；
案例：
```js
var a = 100;
function step(){
    a--;
    if(a === 0) return
    requestAnimationFrame(step)

    //如果需要传入参数
    requestAnimationFrame(()=>step(1))
}
step()
```
兼容处理：
```js
if(!window.requestAnimationFrame){
    requestAnimationFrame = function(fn){
        setTimeout(fn,17)  // 因为刷新频率是16.7ms执行一次，所以是17;
    }
}
```

二、时间对象
1、创建时间，返回一个对象，这个对象里面就有各种属性和方法；
时间对象时需要实例化获取方式来获取；
（1）new Date();    获取当前时间；
（2）new Date("2018/4/29 12:00:00"); 设置时间；中划线，逗号(不用加引号)，或者时间戳；
        +new Date()   添加一个+号会变成时间戳
（3）getFullYear();   年，获取到的内置对象是当前变量中的日期
（4）getMonth()+1；  月，月份是0-11
（5）getDate();        日；
（6）getDay()；       星期，取值0-6,0表示周日；
（7）getHours();      时间；
（8）getMinutes();   分钟；
（9）getSeconds();   秒；
（10）getMilliseconds()   获取毫秒；
（10）getTime()；从1970年1月1日到当前设置好的时间的毫秒；（常用）
（11）Date.parse()；将一个格式的时间转为一个时间戳，毫秒；（可以直接放入new Date，也可以写格式时间，格式为：'月/日/年'）
（12）setTime()   设置时间戳，也可以直接放进new Date里面；
简写：+new Date()  也是一个时间戳；


2、设置时间：date.setDate(date.getDate() + 7);
（1）设置时间需要先获取时间；
（2）有get的都可以set；set有容错能力，如：61秒就是1分1秒；
```js
// 设置日期加7天；
var date = new Date();   // 从声明开始就已经定死了,一直是该时间;
date.setDate(date.getDate() + 7);

// 设置日期加7天；
var date = new Date();
date.setDate(date.getDate() + 7);
```

3、获取星期和月数；
（1）获取这个月有多少天：new Date(y,m,0).getDate()；
（2）获取当前是这个月的周几：new Date(y,m,0).getDay()；
（3）获取这个月的第一天是周几：new Date(y,m-1,0).getDay()+1;
        先获取上一个月多少天，再获取星期时加一天就是这个月的第一天；
（4）如果想获取当前月份最后一天，可以直接设置日为0
setDate(0)

```js
var date= new Date(); //获取当前时间
var y=date.getFullYear(); //获取年
var m=date.getMonth()+1; //获取月
var d=new Date(y,m,0).getDate(); //获取当前这个月有多少天
var week=new Date(y,m-1,0).getDay()+1; //获取当前这个月第一天是周几
if(week >=7){week=0}; //7+1会为8，所以等于0
```

了解：
//英文状态
字符串格式时间：
toString();   Thu May 02 2019 01:24:10 GMT+0800 (中国标准时间)
toDateString();     Thu May 02 2019；
toTimeString();    01:24:56 GMT+0800；
toUTCString();   显示世界时间；

//转成本地时间
toLocaleString();   //2019-7-11 21:49:52
toLocaleDateString();  //2019-7-11
toLocaleTimeString();  //上午9:00:00;


4、设置一个倒计时：
计算两个时间的间隔，用第一个时间减去第二个时间；
（1）计算出目标时间和现在时间的间隔多少毫秒，用目标时间减去现在的时间，之后再除以一千显示为秒；
计算倒计时剩下的时间：
```js
var t = parseInt(time /60/60/24); 
var h = parseInt(time%86400/3600);    //取天的剩下的小时；
var m = parseInt(time%3600/60); //取不够一个小时的时间
var s = time%60;    //取不够一分的时间；

s = 1242626
m = s / 60
h = s / 60 / 60
t = s / 60 / 60 / 24
```
（2）根据计算出的时间写出时间戳，也可以再加入补零的操作

（3）倒计时思想：
	* 
获取时间，根据时间得到年月日，时分秒，
	* 
补零；
	* 
用一个定时器让时间跑起来；



5、计算一个循环花了多长时间
```js
let startTime = new Date().getTime()   // 记录一个开始时间毫秒
for(var i=0;i<10000;i++){}
let endTime = new Date().getTime()   // 记录一个结束时间毫秒
console.log(endTime - startTime)

// 当然也可以使用console.time来获取;
```
6、时间的比较
不要直接通过时间对比，是不相等的，想要相等，可以对比时间戳
```js
let date = new Date('2019/6/1')
let date2 = new Date('2019/6/1')
console.log(date == date2)  // false
console.log(date.getTime() === date2.getTime())  //true
// +号可以快速进行Number转换成时间戳
```
时间插件： http://momentjs.cn/
比moment打包更小的插件：dayjs https://github.com/iamkun/dayjs

7、bug
如果获取最后一天出错了，跳了月份，可以设置setMonth(28)即可，或者29，再getMonth+1

8、时间格式化函数
```js
function format(value){
  let data = new Date(value)
  let Y = data.getFullYear()
  let M = data.getMonth() + 1
  let R = data.getDate()
  let h = data.getHours()
  let m = data.getMinutes()
  let s = data.getSeconds()
  let f = d => String(d).padStart('2', '0')
  return `${Y}-${f(M)}-${f(R)} ${f(h)}:${f(m)}:${f(s)}`
}
```

三、dayjs用法
推荐使用dayjs，和moment用法一致，但是打包更小，moment打包之后200k，dayjs打包之后2k；
支持链式调用
1、安装：npm i dayjs

2、获取：
dayjs().year()   年；
月：month
日：date
星期：day
时：hour
分：minute
秒：second
毫秒：millisecond

2、操作
```js
// 格式化, 里面会检测字母, 大写H是24小时制 小写是12
dayjs().format('YYYY-MM-DD hh:mm:ss A') // 2021-01-10 04:39:28 PM

// 获取一月初
dayjs().startOf('months')

// 获取一年年末
dayjs().endOf('year')

// 增加7天
dayjs().add(7, 'days') 

// 减少7天
dayjs().subtract(7, 'days')

// 上个月, months可用: day
dayjs().subtract(1, 'months')
```
3、设置
```js
dayjs().set('month', 3).month() // 获取
```
4、查询
	* 
早于：dayjs('2010-10-20').isBefore('2010-10-21')
	* 
晚于：isAfter
	* 
闰年：dayjs().isLeapYear()
	* 
返回月份的天数：dayjs().dayslnMonth()





三、Math
1、Math.abs()；取绝对值，负数是他的相反数，正数还是为正；
2、Math.floor()；向下取整，取最向下最接近的整数；
3、Math.ceil()；向上取整，取最向上最接近的整数；
4、Math.round()；四舍五入；-1.6为-2；
5、Math.min()；取一组数的最小值，括号填写一组数；
6、Math.max()；取一组数的最大值，括号填写一组数；
7、Math.pow()；两个值，n的m次方；
8、Math.sqrt()；开平方
9、Math.random()；取随机数，取出来的是0-1的随机小数；括号不填值；
    取n-m的随机数：Math.random()*可能值的总数+第一个可能的值
    取n-m的随机数：Math.random()*(m-n+1)+n；
    比如3-10的随机数：Math.random()*8+3；
    取整：Math.floor(Math.random()*(m-n)+n；
    如果是0-10，最后需要+1，否则取不到10，如果不需要10，则不用加1；
    理解随机数：Math.ceil(Math.random()*6)   取1-6；向上取整不会包括0；因为不会到6，所以是6；
10、Math.PI   圆周率，没有小括号;
11、Math.sin()/Math.cos();    正弦/余弦
12、Math.trunc(i) : 直接去除小数部分；只对number有效；

Math.max()：用法
```js
Math.max(...arr.map(s=>s.length)) 
  // 使用map返回长度组成新数组,再使用...扩展运算符将其分解;，取出最大数;
```

摘抄网址：
1、时间dayjs使用：https://www.cnblogs.com/cjrfan/p/9154539.html