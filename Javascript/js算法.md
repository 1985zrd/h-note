# js算法
## 数组去重

1. 两个循环判断

判断问题：拿第一个和每一个去做比较，所以需要用到两个循环；

（1）写两个循环，第一个循环数组第一个数据，第二个循环让每一个和第一个做比较。

（2）第二循环j=i+1，再判断第二个循环的下标是否和第一个循环的下标的字符相同，如果是相同的，则删除一个

（3）删除之后数组变短，让j减一，重新做比较。

```js
for(var i=0;i<ary.length;i++){
    for(var k=i+1;k<ary.length;k++){ 
        if(ary[i] === ary[k]){
            if(i == k){  //如果k等于0，则需要这一步
                continue;
            }
            ary.splice(k,1);
            k--; 
            //前面删除一个之后数组的长度会进1，此时的k会直接跳到循环去加1，让k减1；
        }
    }
}
```
2. 使用set去重
```js
Array.from(new Set([1,2,2,3])
```
3. 使用reduce去重
```js
let arr = [1,2,3,4,4,1]
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
      return pre.concat(cur)
    }else{
      return pre
    }
},[])
```
4. 使用filter去重；
```js
function unique (array) {
  var str = '';
  return array.filter(item=>{
    //利用filter过滤返回true的情况;
      // 判断字符串中有没有，如果有，则return;
    if (str.includes(typeof item + item)) return  
    return str += (typeof item + item)  // 如果没有，则存入，返回true;
  })
}
```




## 数组乱序

1. 原地洗牌，不需要声明额外的数组从而更加节约内存占用率，

原理：依次遍历数组的元素，将当前元素和之后的所有元素中随机选取一个，进行交换
```js
function shuffle(arr){
    for(let i=0;i<arr.length;i++){
        // 由于下标从0开始，length从1开始因此使用floor向下取整;
        let index= i + Math.floor(Math.random()*arr.length);
        [arr[i],arr[index]] = [arr[index],arr[i]]； // 这里使用了es6的交换位置方法
    }
    return arr
}   // 传入一个数组则乱序
```
2. 非原地洗牌
```js
function sort2(arr){
  let arr2 = []
  while(arr.length){
    // arr的长度会越来越少; 实现随机生成的乱序;
    let index = Math.floor(Math.random()*arr.length)
    arr2.push(arr.splice(index,1)[0])
  }
  return arr2
}
```
3. 使用sort进行乱序
```js
let sort2 = arr => arr.sort(()=>Math.random() - 0.5)
```



## 数组排序

1. 选择数组排序

判断问题：拿第一个和每一个去做比较，如果大于第二个，则让第一个到第二个位置去；

（1）写两个循环，第二个循环j=i+1;，不比较本身。

（2）判断数组的第一个字符i是否大于数组的第二个j字符，如果大于第一个字符，则调换位置。

2. 冒泡数组排序
```js
for(var i=0;i<ary.length;i++){
    for(var k=0;k<ary.length;k++){
        if(ary[k] > ary[k+1]){ //2k > 1n 1n 2k
            var n=ary[k];
            ary[k]=ary[k+1];
            ary[k+1]=n;
        } //自身和紧挨着的后一个比较;
    }
}
```
3. sort()排序
```js
arr.sort();
从大到小==>  arr.sort((a,b)=>b-a)
```


## 对象拷贝方法
浅拷贝：...扩展运算符浅拷贝；
```js
var obj = {a:'haha',b:{c:'haha'}}
var obj2 = {...obj}
obj.b.c = 'lalala'
console.log(obj2.b.c)   // 'lalala'
```
深拷贝：
1. JSON方法
```js
let obj = {name: 'zs',age:18}
let obj2 = JSON.parse(JSON.stringify(obj))
obj2.name = 'ww'
```
2. jquery深拷贝
```js
var obj2 = $.extend(true,{},obj3)
```
3. 浅拷贝+递归
```js
// 第二个参数可传可不传;
function deepClone(origin,target={}){
    for(let prop in origin){
        // 不拷贝原型上的内容;
        if(origin.hasOwnProperty(prop){
            // 判断该值还是不是一个对象;
            if(typeof origin[prop] === 'object'){
                // 判断一下类型,并进行拷贝;
                target[prop] = Array.isArray(origin[prop]) ? [] : {}
                deepClone(origin[prop],target[prop])
            } else {
                target[prop] = origin[prop]
            }
        }
    }
    return target
}
```



## 对象合并

1. jquery
```js
var obj2 = $.extend({},obj1,obj3,obj4)
```
2. vue中
```js
vm.userPro = Object.assign({},obj1,obj2)
```

## 扁平化数组

1. reduce
```js
let arr = [1,2,[3,4,[5,6]]]
function fn(arr){
    return arr.reduce((p,c)=>{
        return p.concat(Array.isArray(c)?fn(c):c)
    },[])
}
fn(arr) // [1,2,3,4,5,6]
```
2. toString和split方法，仅对数字有效
```js
let arr = [1,2,[3,4,[5,6]]]
let arr2 = JSON.parse(`[${arr.toString()}]`)
```
3. 使用递归遍历
```js
let arr = [1,2,[3,4,[5,6]]]
function fn(arr){
    let res = []
    arr.map(item=>{
        if(Array.isArray(item){
            res = res.concat(fn(item))  // 将调用的结果合并
        }
        res.push(item)
    })
    return res
}
```
4. flat()
括号里面传入数字，表示扁平化几个，当传入Infinity时，会扁平所有的数组；
```js
var arr = [1[,2,3,[4,5,6]]]
arr.flat(Infinity)
```
5. 使用...扩展运算符，最实用的一个方法
```js
let arr = [1,2,[{name:'h'},[{age:18}]]]
while(arr.some(Array.isArray)){
    arr = [].concat(...arr)
}
console.log(arr)
```



## 数据结构 

什么是数据结构：数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率。数据结构往往同高效的检索算法和索引技术有关；

### 栈（Stack）简介
什么是栈：栈是一种高效的数据结构（后进先出(LIFO)原则的有序集合），因为数据只能在栈顶添加或删除，所以这样的操作很快，而且容易实现。

场景：编程语言中的编译器、计算机内存存储变量和方法调用，浏览器的后退功能等等；

Stack包含以下方法
* push(e)：将新添加的元素添加至堆栈的顶部
* pop()：删除栈顶的元素，同时返回已删除的元素
* peek()：返回堆栈的顶部元素
* isEmpty()：判断堆栈是否为空，如果为空返回true
* clear()： 清空堆栈所有的元素
* size()： 返回堆栈元素的数量，类似数组的长度
* toArray()：以数组的形式返回堆栈的元素
* toString()： 以字符串的形式输出堆栈的内容；



由于数组是有序数组，如果存储大数据内容过多的话，会消耗更多的计算机内存，算法的复杂度就会增加，为了解决此类问题，建议使用对象的形式；
```js
export default class Stack {
    constructor() {
        this.count = 0;
        this.items = {};
    }
    push(element) {
        this.items[this.count] = element;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    isEmpty() {
        return this.count === 0;
    }
    size() {
        return this.count;
    }
    clear() {
        /* while (!this.isEmpty()) {
            this.pop();
          } */
        this.items = {};
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`;
        for (let i = 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
}
```
以上方法在Stack类中声明的items和count属性是不受保护的，可以使用symbol数据类型作为对象的属性具有私有性的特点，改变以上属性；
```js
const _items = Symbol('stack')
class Stack{
    constructor(){this[_items]=[]}
    push(element){this[_items].push(element)}
    pop(){return this[_items].pop()}
    peek(){return this[_items][this[_items].length-1]}
    isEmpty(){return this[_items].length === 0}
    size(){return this[_items].length}
    clear(){this[_items] = []}
    toString(){return this[_items].toString()}
}
```
实际应用举例
实现一个十进制转换二进制的功能，在与计算机进行通信必须使用二进制的功能，如果需要转换2进制需要将转换的数字除以2，再将结果除以2，如此循环，直到结果为0为止；
```js
function decimalToBinary(decNumber){
    const remStack = new Stack()
    let number = decNumber
    let rem;
    let binaryString = ''
    while(number > 0){
        rem = Math.floor(number % 2)
        remStack.push(rem)
        number = Math.floor(number/2)
    }
    while(!remStack.isEmpty()){   // 如果不为空则会一直循环;
        binaryString += remStack.pop().toString()   
        // 将数取出来并添加进去;
    }
    return binaryString
}
```

### 链表（Linked List）
链表是一个线性结构，同时也是一个天然的递归结构，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理，但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大；

为何要使用链表：因为数组有缺陷，增删元素时往往需要移动元素，而链表在内存中的放置并不是连续的，元素通过next属性指向下个元素，所以链表增删元素，不需要移动元素，只需要更改next的指向即可；

使用场景：在javascript中，最重要的链：作用域链和原型链；

链表的创建：

首先创建一个用来保存链表里的数据
```js
/**
* Node用来表示节点
* element 用来保存节点上的数据;
* next 用来保存指向下一个节点的链接;
*/
function Node(element){ 
    this.element = element;
    this.next = null 
}
```
链表的方法：
* append(element)：向链表尾部添加一个新的元素
* insert(position,element)：向链表特定位置插入元素
* remove(element)： 从链表移除一项
* indexOf(element)： 返回链表中某元素的索引，如果没有返回-1
* removeAt(position)：从特定位置移除一项
* isEmpty()： 判断链表是否为空，如果为空返回true
* size()： 返回链表包含的元素个数
* toString()：重写继承Object类的tostring方法，因为我们使用了Node类；

