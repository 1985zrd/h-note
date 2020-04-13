# es6-02 扩展、Symbol、iterator
## 一、扩展运算符： ...

...变量名，类似于arguments，是真正的数组；

使用arguments无法进行forEach遍历，...参数可以进行遍历，是真正的数组；

（1）...作为形参使用：，必须写到形参末尾，形参前面没传的参数全部追加到...参数中；

（2）数组的展开：函数传参数的时候（实参）等同于apply；

(3)复制数组   arr2=[...arr1]  修改arr2不影响arr1。

(4)拼接数组   arr=[...arr1,...arr2]

(5)将字符串转数组  arr=[...str]

如果带点则返回每一项，如果直接使用点后面的参数，返回一个数组；
```js
function fn(a,...args){
    console.log(args);     //a为1,args为[2,3,4];
}
fn(1,2,3,4);
//原生实现方法
function fn(a,b){
    const ext = Array.prototype.slice.call(arguments,2)
    console.log(a,b,ext) //a:1,b:2,ext:[3,4]
}
```

2. 将一个字符串转换为数组的方法：
```js
str.split('')；
[...str]；
Array.from(str)
```

3. es6扩展运算符对象的使用：
（1）解构赋值：
```js
let {x,y,...z} = {x:1,y:2,a:3,b:4};
x // 1
y // 2
z // { a: 3, b: 4 }
```
解构赋值...必须在最后面，否则报错；

（2）深拷贝
```js
let obj = {name:'',age:18,list:['hh','mm']}
let obj2 = {...obj,list:[...obj.list]} 引用类型需要继续扩展
```

（3）合并对象
```js
let obj1 = {name:''}
let obj2 = {age: 18}
let obj3 = {...obj1,...obj2}
```


    数组展开应用场景：
```js
function fn3(...arr) {

    fn(...arr) //输入和下行一样；
    fn.apply(null,arr)   //调用fn函数,null为不改变fn函数中的this
}
function fn(a, b, c) {
    console.log(a, b, c, '----');
}
fn3(11, 22, 33)
```


## 三、symbol（符号、代号、象征）

主要解决命名冲突问题，主要目的是作为对象属性的标识符

(已有的原始数据类型：String, Number, boolean, null, undefined, 对象)

Symbol特点:

（1）Symbol属性值是唯一的，两个symbol是不相等的，主要是解决命名冲突问题

（2）直接创建两个相同值的symbol在比较时是不相等的，如果需要相等可以使用symbol.for(key)创建

原理是使用给定的key进行搜索，并返回对应的key，如果没有则创建

（2）Symbol值不能与其他数据进行计算，包括同字符串拼串

（3）Symbol不支持for in, for of遍历；

（4）Symbol值作为对象属性名时，不能用点运算符，需要用中括号包起来；

（5）symbol不能使用new，否则会报错，symbol是一个原始类型的值，不是对象；

（6）Symbol函数可以接受一个字符串作为参数；

（7）Symbol可以使用es6提供的Reflect.ownKeys()来获取到一个对象中的Symbol属性名
```js
let s1 = Symbol('name')
let obj = {
    [s1]: 'hhh'
}
obj[s1] = 'hehe'
obj[Symbol()] = 'xixi' // 这样是获取不到的;
console.log(obj[s1])
```


Symbol作为对象属性的好处：只能使用Symbol变量来访问，不能通过Symbol来访问



2. Symbol的实例方法

（1）Symbol.for()

使用Symbol.for创建symbol值时，会先在全局搜索是否有创建过传入的字符串，如果有则直接返回，如果没有，则创建新的；

全局包括：当前页面、iframe、service worker；
```js
const s1 = Symbol('haha')
const s2 = Symbol('haha')
s1 === s2 // false

const s3 = Symbol.for('xixi')
const s4 = Symbol.for('xixi')
s3 === s4 // true
```

（2）Symbol.keyFor()

传入symbol变量返回创建时的标识，只能是使用Symbol.for创建的才可以返回，使用Symbol直接创建的是无法返回的；
```js
const s5 = Symbol('lison')
const s6 = Symbol.for('hh')
Symbol.keyFor(s5) // undefined
Symbol.keyFor(s6) // hh
```

3. 11个内部的Symbol值；

（1）Symbol.hasInstance  调用instanceof时触发
```js
let obj = {
  [Symbol.hasInstance] (other) {
    console.log(other)
  }
}
console.log({a:'a'} instanceof <any>obj) // 当使用instanceof时会首先调用Symbol.hasInstance方法
```

（2）Symbol.isConcatSpreadable    concat不扁平化
```js
let arr = [1,2]
[].concat(arr, [1,2]) // [1,2,3,4]
arr[Symbol.isConcatSpreadable] = false
[].concat(arr, [1,2]) // [[1,2],1,2] 
// 使用了该属性就不会被扁平化了
（3）Symbol.species   创建延伸实例
（4）Symbol.match 调用match时会调用该方法
（5）Symbol.replace
（6）Symbol.search
（7）Symbol.split
```
es6官网地址： https://es6.ruanyifeng.com/#docs/symbol


## 四、iterator（遍历器）    

概念：是一种接口机制，为各种不同的数据结构提供统一的访问机制；

作用：为各种数据结构，提供一个统一的、简便的访问接口，使得数据结构的成员能够按某种次序排列

ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of使用，使用方法和for...in一样；

支持iterator接口的数据：

Array、arguments、String、set容器、map容器；



遍历对象可以将对象转数组

```js
for (const [key, value] of Object.entries(me)) { 
    console.log(`${key}: ${value}`);
}
```



工作原理[了解]:

①创建一个指针对象，指向数据结构的起始位置。

②第一次调用next方法，指针自动指向数据结构的第一个成员

③接下来不断调用next方法，指针会一直往后移动，直到指向最后一个成员

④每调用next方法返回的是一个包含value和done的对象，{value: 当前成员的值,done: 布尔值}

⑤value表示当前成员的值，done对应的布尔值表示当前的数据的结构是否遍历结束。

⑥当遍历结束的时候返回的value值是undefined，done值为true

```js
var arr = [11, 2, 44, 6]
function init(ary) {
    var i = 0;
    return {
        next: () => {
            return i > ary.length ? {value:ary[i++],done:false} : {value:ary[i++],done:true}
        }
    }
}
var nexts = init(arr);
console.log(nexts.next());
console.log(nexts.next());
console.log(nexts.next());
console.log(nexts.next());
console.log(nexts.next());
```
