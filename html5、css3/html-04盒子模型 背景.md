# html-04盒子模型 背景
盒子模型：

由内容（width,height），padding(内边距)，border(边框)，margin(外边距)组成。


## 一、padding：内边距。
内容与边框之间的距离，

padding-方向 ，，方向设置top上，right右，bottom下，right右。

复合写法：padding：

一个值：所有边

两个值：上下，左右

三个值：上，左右，下

四个值： 上，右，下，左（从上边开始，顺时针一圈）

在有设置宽高的时候，padding值改多少，对应的宽高需要减多少，margin值设置不影响宽高。因为padding值是设置的内容，会占用宽高，而margin设置的外边距， 不是内容不占用内容的宽高；




## 二、border边框。
padding与margin之间的距离

边框的三个要素：边框的宽度width，边框的样式style，边框的颜色color。

border-方向-要素。


边框的样式style有有四种：

`solid`实线 `dashed`虚线

`dotted`点状 `double`双实线


去掉边框：border: none;

复合写法:（和padding复合写法一样）

`border-right`: 宽度 边框样式 颜色；中间用空格隔开。

有方向是单独方向样式，没有方向是所有的边框样式。

使用边框写三角形：

设置宽高都为0，设置边框宽度，设置实线，设置其中一条边有颜色，其他颜色都为transparent(透明色)。也可以设置上，左右边框，上有颜色，左右隐藏。




## 三、外边距
margin：边框以外的距离，使用方法和padding值一样。

margin的两个问题：
1. 当margin-top和margin-bottom相遇的时候，会出现重叠，谁大取谁，相同取其一。

    解决办法：给其中的一个标签设置margin值

2. 给小盒子加margin-top；会出现塌陷的现象

原因：给小盒子设置的margin-top传递给了父元素，导致出现了塌陷，只有子元素是父元素的第一个子元素才会出现问题，如果不是第一个子元素，看看前面的元素有没有内容样式，没有内容样式也会出现塌陷，前面子元素没有内容就不会出现塌陷。

**解决办法：**
1. 给大盒子加padding-top（需要给盒子的高度减对应的值），或者触发BFC。
2. 小盒子有文字也不会塌陷，
3. 给大盒子设置border值，小盒子的margin-top也不会传递给大盒子。
4. 大盒子有一个padding：1px，也不会出现塌陷。


对内联元素设置padding和margin值有用吗？

padding:左右管用，上下不管用（上下部分的背景颜色可以延伸）

margin:左右管用，上下不管用，

如果需要给内联元素设置padding和margin值，需要给内联元素套一个盒子，或者转为块元素。



盒子模型的宽度=margin左右值+border左右值+padding左右值+宽度

盒子模型的高度=margin左右值+border左右值+padding左右值+高度




## 四、背景
1. background-color:red; 背景颜色

2. background-image: url(pic.gif); 背景图片：用url来引入路径

3. background-repeat：背景是否平铺。

`no-repeat`：不平铺。

`repeat-x`：沿x轴平铺。

`repeat-y`：沿y轴平铺。

4. `background-position`：背景定位

一个值：这个值代表x轴的位置，y轴位置默认为center；

两个值：第一个值x轴的位置，第二个值y轴的位置。

两个值单位可以写：px或者方向left,top,right,bottom,center,%

写 %的话，(0% 0%,左上角；100% 100% 右下角)。

复合写法：

`background`:背景颜色 背景图片 背景平铺 背景定位。

`background`:red url(pic.gif) no-repeat right bottom ;


6. background-attachment：背景图片是否跟随页面其他部分滚动而滚动。

fixed：固定在页面的顶部，滚轮滑到哪，图片在哪

scroll：(默认值)滚动，，这个属性设置到body里。





## 面试题
● 简述css盒模型？

● 如何使用border实现小三角？

● margin外边距常见问题及处理方法？

