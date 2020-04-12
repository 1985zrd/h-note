# node-03 fs文件
一、fs系统
1、fs模块中提供的方法一般有两种：同步[有返回值]，异步[有回调函数]；   
       带Sync的都是同步的，需要变量来接收；
在获取文件出错时，异步可以使用err来处理错误，同步可以使用try...catch来捕获
使用异步无法保证处理顺序，可以将后续操作放在异步的回调函数里面处理即可；  
使用异步必须带回调函数，否则会抛出错误

文件路径：
process.cwd()  指定当前工作目录

一、不完全读写（对大文件操作的，可以分段操作）
2、对文件操作的方法有：
打开文件：fs.open()，fs.openSync()；
读取文件：fs.read()，fs.readSync()；
写文件   ：fs.write()，fs.writeSync()；
关闭文件：fs.close()，fs.closeSync()；

fs.readFile() 相当于fs.open()---fs.read()---fs.close()；

3、常用的文件系统标志：
r：  读取，文件不存在则报错；
r+：读写，文件不存在则报错；
w： 写入，文件不存在则自动创建，如果有会覆盖；
w+：读写，文件不存在则自动创建；
a：   追加内容，文件不存在则自动创建；
a+：读取并追加内容，文件不存在自动创建；


4、打开文件：
异步：fs.open(path[,flags],callback);
path:读取文件的路径；
flags：文件系统标志，加引号；
callback：两个形参err,fd；   fd是文件句柄，方便后续使用；
同步：fs.openSync返回一个fd；
读文件需要加'r'，写文件需要加'w'；
open主要是获取到fd，进行一步read和write操作；

fs.open(filepath,'r',(err,fd){ console.log('哈哈',fd) })

5、读文件：
异步：fs.read(fd,buffer,offset,length,postion,callback);
fd指定文件中读取，在open之后的fd形参，指向已打开的文件；
buffer：数据将写入的缓冲区，需要先声明一个缓冲区；
offset：是buffer中从第几个开始读取；
length：读取多少个字节；
position：读取文件初始位置
回调函数有三个参数(err,bytesRead,buffer)；
bytesRead返回已经读取了多少个字节；
buffer缓冲器里面的内容；
同步：fs.readSync返回一个bytesRead；
例：fs.read(fd,buffer,3,4,5,(err,bytesRead,buffer)=>{})；
```js
const fs = require('fs')
let buf = Buffer.alloc(6) // 创建6字节长度的buf缓存对象
// 打开文件
fs.open('6.txt','r',(err,fd)=>{
    // 读取文件
    fs.read(fd,buf,0,3,0,(err,bytes,buffer)=>{
        console.log(buffer)
        // 可以继续读取
        fs.read(fd,buf,3,3,3,(err,bytes,buffer)=>{buffer.toString()})
    })
})
```
6、写入文件（需要在open之后）
fs.write(fd,buffer,offset,length,position,callback);

7、文件关闭
fs.close(fd,callback)


二、完全读写：
1、读取文件：
fs.readFile(path[,options],callback);
option：默认为r；
callback：两个参数：err,data;
fs.readFileSync(path[,option])；返回data；
readFile加入一个对象：{encoding:'utf-8'}，可以不用.toString()来获取文件内容；
也可以直接：fs.readFileSync(filepath,'utf-8')
```js
fs.readFile(path.resolve(__dirname,'./1.txt'),(err,data)=>{
    console.log(data.toString()) //data默认是buffer
})
```
2、写入文件：
fs.writeFile(file,data[,options],callback);
options：常用于要修改文件系统标志时，默认是'w'，所以需要改a用来追加；
修改标志：{flag:'a'}；
callback：一个err参数；
fs.writeFileSync(file,data[,{flag:''}])没有返回值；\n可以换行

3、文件追加：
fs.appendFile(filename,data[,options],callback)
fs.appendFileSync(filename,data[,options])
读取的文件名、追加数据、文件追加的默认flag是a；

4、拷贝文件
fs.copyFile(filenameA,filenameB,callback)
fs.copyFileSync(filepath,filepath1)
原始文件名、拷贝文件名

5、删除文件
fs.unlink(path,callback)
fs.unlinkSync(path)

读取小文件时，直接使用readFile()或readFileSync()；
读取大文件时，使用文件流；



二、文件流
1、文件流
读文件：fs.createReadStream(path[,options])；
写文件：fs.createWriteStream(path[,options]);

writeStream有两个常用事件：finish和error；
readStream有五个常用事件：data,end,open,close,error，通过on监听；

writeStream有两个常用方法：write[写],end;  end必须调用，无论有无参数；

创建之后是一个对象，里面有一些方法可以使用；
事件：.on调用事件，之后写一个回调函数(fs.on(event,callback))；
```js
// 将文件打开并写入数据;    也可以直接使用管道流
rs.on('open',()=>{ console.log('打开成功....') })
rs.on('data',data=>{ wx.write(data) })
```
3、管道流
fs.pipe()；
readStream.pipe(writeStream)；
将读取到的文件流入写入的文件
```js
const rs = createReadStream(`${__dirname}/...`)
const ws = createWriteStream(`${__dirname}/...`)
rs.pipe(ws)
```
三、目录操作
1、创建新目录
fs.mkdir(path[,options],callback)；
    options：一个对象：recursive:true；递归创建（文件存在不报错）；
fs.mkdirSync(path[,options]);没有返回值；
fs.existsSync(path) 判断目录是否存在
的根目录上使用fs.mkdir()即使使用递归参数，都会报错；
```js
fs.mkdir('/',{recursive:true},err=>{console.log(err)})
```
2、读取目录
fs.readdir(path,callback);
fs.readdirSync(path);

3、删除目录
fs.rmdir(path,callback);   不能删除有文件的目录；
fs.rmdirSync(path)；

实例1：删除空目录时使用rmdir就可以了，删除非空目录需要使用递归；
```js
const fs = require('fs')
const path = require('path')

function getFile(dirName){
    let dirs = fs.readdirSync(dirName);    //打开文件
      //循环这个目录所有的文件
    dirs.forEach(item=>{ 
            //拼接一个完整的路径，注意使用形参路径;
        let curPath = path.resolve(dirName,item);
           //获取文件的状态，来判断文件是否是一个目录;
        let stats = fs.statSync(curPath);
        if(stats.isDirectory()){
            getFile(curPath);
        }else{
            fs.unlinkSync(curPath);
        }
    })
    fs.rmdirSync(dirName);   //删除这个文件；
}
getFile(`${__dirname}/test`)
```
实例2：快速重命名
（1）一次性替换所有文件的名字；
```js
var fs = require('fs')
/**
*
*@param {String} dirName
*@param {String} oldStr
*@param {String} newStr
*/
function rename(dirName,oldStr,newStr){
    let dirArr = fs.readdirSync(dirName)
    for(var i=0;i<dirArr.length;i++){
        fs.renameSync(`${dirName}/${dirArr[i]}`,`${dirName}/${dirArr[i].replace(oldStr,newStr)}`)
    }
}
rename('./files','hello','pink')
```
（2）通过shift+右键   打开PowerShell可以使用
```shell
Get-ChildItem * | rename-item -newname {$_.name -replace 'hello','你好'}
```
（3）打开cmd，输入node，输入以下的代码即可
```js
fs.readdirSync('./').forEach(i=>{fs.renameSync(`./${i}`,`./${i.replace('','')}`)})
```
四、文件操作
1、新建文件：
writeFile的时候，如果没有就自动创建；
fs.writeFile(path,data[,options],callback)；
```js
fs.writeFile('./files','hello',(err)=>{
    console.log('创建文件成功')
})
```
1、复制文件：
fs.copyFile(src,dest,callback)；源文件，目标文件； 
fs.copyFileSync(src,dest);
也可以使用流操作复制文件；

2、重命名文件
fs.rename(oldPath,newPath,callback);  也可以重命名
fs.renameSync(oldPath,newPath)；

3、删除文件：
fs.unlink(path,callback);    不能删除目录；
fs.unlinkSync(path); 

4、文件状态
fs.stat(path,callback)
    callback有两个参数：err，stats，stats是fs.stats，返回的是一个对象；
    stats.isDirectory()；是否是一个目录；
    stats.isFile()是否是一个文件；
fs.statSync(path);


五、获取时间的第三方包(time-stamp)
1、安装  npm i time-stamp
2、‘YYYY-MM-DD HH:mm:ss’   年月日，时分秒；ms毫秒，需要加引号；
3、直接使用方法：timestamp();   获取当前年月日；
4、timestamp.utc()；获取国际时间；


六、global全局对象
在js模板中，没有window对象，使用global访问全局对象
全局对象，没有使用var、let、const声明的变量
对于全局变量，声明了一个全局对象，则会一直存在，即使删除了声明的变量，除非关闭文件；
```js
var a = 10
b = 10
console.log(global.a) // undefined
console.log(global.b) // 10
```

七、缓冲器
1、什么是缓冲器：可以直接操作内存；
     可以将Buffer看作数组，buffer可以操作二进制；
     buffer在全局作用域中，因此不需要require；

2、Buffer.alloc();
分配空间，用0去初始化，括号填写多少个字节；

3、Buffer.allocUnsafe()；（不安全）
分配空间，并未初始化；

4、Buffer.from()；
可以放字符串，数组，存放的是ascii码；

utf-8和gbk的区别
utf-8一个汉字3个字节，gbk一个汉字2个字节；



八、path
path.basename(p,[ext])  第二个参数为要去除的后缀

path.extname


