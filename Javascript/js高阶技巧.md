# js高阶技巧
## 浏览器渲染过程（背）
1、解析HTML，生成DOM树，解析CSS，生成CSSOM树；
2、将DOM树和CSSOM树结合，生成渲染树(Render Tree)；
3、Layout(回流)：根据生成的渲染树，进行回流，得到节点的几何信息（位置，大小）；
4、Painting（重绘）：根据渲染树以及回流得到的几何信息，得到节点的绝对像素；
5、Display：将像素发送给GPU，展示在页面上；

学习浏览器渲染原理更多的是为了解决性能上的问题；并且渲染原理在面试中答得好，也是一个能与其他候选人拉开差距的一点，在JS中有一个JS引擎，执行渲染也有一个渲染引擎，渲染引擎在不同的浏览器也都是不同的，内核不一样，主要关注webkit的渲染引擎；



## 生成渲染树的过程
1、从dom树的根节点开始遍历每个可见的节点
2、对于每个可见的节点，找到cssom树中对应的规则，并应用它们；
3、根据每个可见的节点以及其对应的样式，组合生成渲染树；

渲染树只包含可见的节点：script、meta、link等，包含display:none都是不可见的节点；visiblity为可见的；

回流和重绘会很大程度影响性能；
回流：布局或者几何属性需要改变就叫回流；
生成构造渲染树，将可以的DOM节点以及对应的样式结合起来，计算它们在设备视口内的确切位置和大小，这个过程就是回流；

重绘：当节点需要更改外观而不会影响布局的，叫作重绘；
在知道了每个节点的具体几何信息，将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫重绘；

何时发生回流重绘
回流这一阶段主要是计算节点的位置和几何信息；
	* 
改变window大小
	* 
改变字体
	* 
添加或删除样式
	* 
文字改变
	* 
定位或者浮动
	* 
盒模型


回流一定会触发重绘，而重绘不一定会回流；

浏览器优化
由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程；浏览器会将修改操作放入队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列；但是，当获取布局信息的操作的时候，会强制队列刷新，比如当你访问以下属性或者方法时：
	* 
offsetTop/left/width/height
	* 
scrollTop/left/width/height
	* 
clientTop/left/width/height
	* 
getComputedStyle
	* 
getBoundingClientRect


上面的属性和方法都需要返回最新的布局信息，因此浏览器必须清空队列，触发回流重绘来计算正确的值，因此在修改样式时最好避免使用上面的属性，他们都会刷新渲染队列；


减少重绘与回流
1、使用translate替代top，在移动元素绝对定位时，使用translate而不是top、left；
2、使用visibility替换display:none，因为前者只引起重绘，而后者直接回流；
3、把dom离线后修改，比如：先把DOM给display:none，有一次回流，然后修改100次，然后再把它显示出来；
4、不要把DOM结点的属性值放在一个循环里当成循环里的变量；
5、不要使用table布局，可能很小的一个小改动会造成整个table的重新布局；
6、动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用requestAnimationFrame
7、CSS选择符从右往左匹配查找，避免DOM深度过深
8、将频繁运行的动画变成图层，图层能够阻止该节点回流影响别的元素，比如对于video标签，浏览器会自动将该节点变成图层；


## TCP三次握手的过程

TCP握手协议
在TCP/IP协议中,TCP协议提供可靠的连接服务,采用三次握手建立一个连接.
第一次握手：建立连接时,客户端发送syn包(syn=j)到服务器,并进入SYN_SEND状态,等待服务器确认；
SYN：同步序列编号(Synchronize Sequence Numbers)
第二次握手：服务器收到syn包,必须确认客户的SYN（ack=j+1）,同时自己也发送一个SYN包（syn=k）,即SYN+ACK包,此时服务器进入SYN_RECV状态；
第三次握手：客户端收到服务器的SYN＋ACK包,向服务器发送确认包ACK(ack=k+1),此包发送完毕,客户端和服务器进入ESTABLISHED状态,完成三次握手.

三次握手的步骤：（抽象派）
客户端：hello，你是server么？
服务端：hello，我是server，你是client么
客户端：yes，我是client

四次挥手的步骤：（抽象派）
主动方：我已经关闭了向你那边的主动通道了，只能被动接收了
被动方：收到通道关闭的信息
被动方：那我也告诉你，我这边向你的主动通道也关闭了
主动方：最后收到数据，之后双方无法通信

## DocumentFragment
1、nodeType值为11；
2、documentFragment是一个文档片段，一种'轻量级节点'；
3、通常作为仓库使用，不存在DOM树上，是一种游离态，主要是优化页面性能；
4、用途：当使用js创建很多dom节点时，在加入节点到dom树上时，节点需要一个个渲染，这样节点数较多时会影响浏览器的渲染效率，这个时候我们将创建的节点都放在documentFragment这样的节点上，然后把documentFragment加入到DOM，只需要完成一次渲染就可以达到之前很多次渲染的效果；
```js
var ul = document.createElement('ul');
var flag = document.createDocumentFragment();
for(var i=1; i<101;i++){
     var li = document.createElement('li')
     var liText = document.createTextNode(i);
     li.appendChild(liText);
     flag.appendChild(li);
}
ul.appendChild(flag);
document.body.appendChild(ul);
```



## requestAnimationFrame（ie10+）
1、类似定时器，与setTimeout相比，它的最大优势是由系统来决定回调函数的执行时机，不需要设置时间间隔，

2、刷新频率：如果屏幕刷新率是60HZ，那么回调函数就每16.7ms被执行一次，如果是75hz，就是1000/75=13.3ms执行一次，它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次， 这样不会引起丢帧现象， 也不会导致动画出现卡顿的问题；

3、requestAnimationFrame的基本思想是 让页面重绘的频率和刷新频率保持同步；

4、优势
（1）cpu节能：如果使用setTimeout实现的动画，即使切换了窗口，后台仍在执行动画，而requestAnimationFrame则不会执行，当出现在视口内，则开始执行；
（2）函数节流： 在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。

5、执行 requestAnimationFrame会返回一个定时器编号，传递给 cancelAnimationFrame用于取消这个函数；编号一般是1；
```js
let count = 0;
function requestAnimation(){
    if(count < 100){   // 作一下判断
        count++
        console.log(count)
        // 需要在函数里面调用该事件;
        requestAnimationFrame(requestAnimation);
    }
}
requestAnimationFrame(requestAnimation)  
 // 页面打开加载这个函数
cancelAnimationFrame(id)，取消requestAnimationFrame
```

## 简单实现Promise
```js
// 未添加异步处理等其他边界情况
// ①自动执行函数，②三个状态，③then
class Promise2{
  constructor(fn){
    this.state = 'pendding'   // 设置一个状态;
    this.value = undefined    // 这个用来接收参数;
    let resolve = value =>{
      this.state = 'resolve'   // 给state赋值,改变状态,用来then方法判断使用;
      this.value = value
    }
    let reject = value =>{
      this.state = 'reject'
      this.value = value
    }
    try{
      fn(resolve,reject)   //给传参的函数来两个形参,分别调用两个函数;
    }catch(e){
      reject(e)
    }
  }
  then(resolve,reject){
    if(this.state === 'resolve'){
      resolve(this.value)
    } else if(this.state === 'reject') {
      reject(this.value)
    }
  }
}
```

## 实现一个call

改变this指针的call和apply的本质就是，将调用的函数放到传入的对象身上，此时this自动就变成对象本身了，之后执行完成将结果返回，删除放到对象身上的函数；
```js
Function.prototype.myCall = function(context){
    context = Object(context) || window  //原生的this会自动用object()转换,不传参数或者null指向window;
    context.fn = this  //设定一个fn到传入的对象身上; this取的是函数;
    let args = [...arguments].slice(1)  //第一个是this对象,得隔离,这里是用来传参;
    let result = context.fn(...args)  //调用call时会执行; 这里将所有代码执行,并保存结果;
    delete context.fn  //执行完成就手动删除该函数;
    return result  //将执行结果返回;
}
```

## 实现一个apply

```js
// apply就是传参问题,是数组
Function.prototype.myApply = function(context,args){
    context = Object(context) || window
    context.fn = this
        //解决没有传参情况;
    let result = args ? context.fn(...args) : context.fn() 
    delete context.fn
    return result
}
```

## 实现一个bind

bind返回的绑定函数也能使用new操作符创建对象，这种行为就像把原函数当成构造器，bind与call/apply最大的不同就是前者返回一个绑定上下文的函数，而后两者是直接执行了函数
bind可以指定this，返回一个函数，可以传入参数，并且可以柯里化
定时器可以直接改变this指向：
```js
setTimeout(function(){}.bind(this),500)  //将this指向上文


Function.prototype.myBind = function(context){
     //判断不是函数的传入情况;
  if(typeof this !== 'function') throw new Error('error')
  var that = this  //保留this指向函数;
  var args = [...arguments].slice(1)  //获取传入的参数;
  return function F(){
      //因为返回的函数可以进行new,因此需要判断一下;判断this是否是指向F
    if(this instanceof F) return new that(...args,...arguments)
      // 返回调用的函数;
    return that.apply(context,args.concat(...arguments))
  }
}
```
