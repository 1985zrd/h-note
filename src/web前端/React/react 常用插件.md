# React常用插件
## react配置eslint地址
[https://www.jianshu.com/p/f8d2ef372adf](https://www.jianshu.com/p/f8d2ef372adf)

补充：

```json
    "spaced-comment": 2, //注释风格要不要有空格什么的
    "space-before-blocks": 2,  // if function等的大括号之前需要有空格
    "space-infix-ops": 2,
    "space-before-blocks": 0, //不以新行开始的块{前面要不要有空格
    "no-irregular-whitespace": 2, //不规则的空白不允许
    "no-trailing-spaces": 2, //一行结束后面有空格就发出警告
    "array-bracket-spacing": ["error","always"], // 数组前后需要有空格
    "object-curly-spacing": ["error","always"], // 对象前后需要有空格
```

## 滚动插件
1. 安装：npm i react-scroll
2. 官网：[https://github.com/fisshy/react-scroll](https://github.com/fisshy/react-scroll)
2. 基础使用：
（1）滚动方法
```jsx
import Scroll from 'react-scroll'
var scroll = Scroll.animateScroll;

// 滚动到顶部
scroll.scrollToTop(options)

// 滚动到底部
scroll.scrollToBottom(options)

// 滚动到指定位置
scroll.scrollTo(100, options)

// 滚动更多像素
scroll.scrollMore(10, options)

// 滚动到元素
var Element = Scroll.Element;
var scroller = Scroll.scroller;
<Element name='myScrollToElement'></Element>
scroller.scrollTo('myScrollToElement', options)
```
（2）Link的使用
```jsx
import {Link} from 'react-scroll'
<Link
    activeclass=''
    to='' // 填写name名字, 在块标签上面写name会滚动到对应位置
    spy={true} // 使链接选择滚动到目标位置
    smooth={true} // 添加滚动动画
    duration={300} // 延时
    offset={-160} // 距离头部距离 element + -160的像素
/>
```



## 组件或图片懒加载

>  可以为图片或者组件提供懒加载功能，当滚动条滚动到该图片上方时才会去加载图片，可以更合理去加载资源，也可以设置高度来在未加载时预留出位置；

安装：`react-lazyload`

1. 基本使用

   ```jsx
   import React from 'react'
   import LazyLoad from 'react-lazyload'
   function App(){
       return (
           Array.from({length: 15}).map(() => {
               <LazyLoad height={200}>
                   <img /> // 也可以放组件
               </LazyLoad>
           })
       )
   }
   ```

   ![image-20200417110903782](http:notecdn.heny.vip/images/react_常用插件-01.png)

   可以通过f12查看控制台是否懒加载成功

2. props

   * `height`：设置占位符的高度，也可以通过css设置；
   * `once`：只加载一次，之后再不检测滚动事件，对于图像或简单组件很有用
   * `offset`：组件位于视口下方的距离，如果

3. 工具函数

   * `forceChec`   手动重新触发检查视口中的元素， 当LazyLoad组件进入视口而没有调整大小或滚动事件时很有用，例如，当组件的容器被隐藏然后可见时。

     ```jsx
     import forceCheck from 'react-lazyload'
     forceCheck() // 在生命周期调用
     ```

   * `forceVisible` 强制组件显示，无论该元素在视口中是否可见

     ```jsx
     import { forceVisible } from 'react-lazyload';
     forceVisible();
     ```

教程地址：[https://github.com/twobin/react-lazyload](https://github.com/twobin/react-lazyload)



## React动画

1. 安装：`npm i react-transition-group`
2. 引入
```jsx
import {CSSTransition} from 'react-transition-group'
```
3. 属性
* `in` 开头
* `timeout` 动画的时间
* `appear`  一加载就执行
* `classNames`   起的变量名称
* `unmountOnExit`用完了以后DOM消失
* `onEnter`   进入时的钩子函数，就一个参数el
* `onEnter`, `onEntering`, `onEntered`, `onExit`, `onExiting`, `onExited` 钩子函数


```jsx
<CSSTransition
    in={flag}
    timeout={2000}
    appear={true}
    classNames='fade'
    unmountOnExit
    onEnter={el => el.style.color='red'}
>
    {/* 一定要空一个div出来不写任何东西,上面的fade会直接将类名放到这个div上面 */}
    <div>
        <div>hello</div>
    </div>
</CSSTransition>
```
4. 类名
* `fade.enter`    进入时的类名
* `fade.enter-active`   进入时执行的类名
* `fade.exit`    离开时的类名
* `fade.exit-active`   离开时执行的类名
* `fade.appear-active`   看情况opacity就不加，要是运动类的必须加上最后的位置；
* `enter-done` 动画完成时



5. `TransitionGroup`，如果多个动画特效，需要用该组件包裹
```jsx
<TransitionGroup key={index}>
    <CSSTransition>
    </CSSTransition>
</TransitionGroup>
```
可以使用react-motion代替： [https://www.jianshu.com/p/82552ce3803a](https://www.jianshu.com/p/82552ce3803a)





