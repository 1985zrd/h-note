---
home: true
heroImage: /logo.png
heroText: 前端学习圈
actionText: 关于作者 →
actionLink: /Vue/
features:
- title: 简洁易懂
  details: 使用Markdown进行编写的文件，更易阅读，方便理解；
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-备案号：蜀ICP备19025245号
---

## 一、记录学习笔记

线上图片地址前缀：https://heny.github.io/h-note/ + 当前文件夹



## 二、Typora添加序号

* 打开文件-->偏好设置-->外观-->打开主题文件夹
* 新建base.user.css文件写样式

将以下scss解析之后复制到base.user.css文件中

```scss
@each $i, $col in (1: 一,2: 二,3: 三,4: 四,5: 五,6: 六,7: 七,8: 八,9: 九,10: 十,11: 十一,12: 十二,13: 十三,14: 十四,15: 十五,16: 十六) {
  // 修改内容h2标题
  h2:nth-of-type(#{$i}):before{
    content: '#{$col}、'
  }
  // 修改侧边栏的h2标题
  .outline-h2:nth-of-type(#{$i}) > .outline-item .outline-label:before {
    content: '#{$col}、';
    display: inline-block;
  }
}


```

填写好上面的样式之后，标题就有序号了，如下图所示



#### vscode scss转换css文件工具

1. 安装：live sass compiler
2. 输出：ctrl+p 输入sass，选择without watch mode即可；

#### 修改自己想要的Typora样式

* shift+f12打开开发者工具
* 使用箭头选中元素，复制类名修改样式即可；