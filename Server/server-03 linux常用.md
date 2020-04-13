# Server-03 linux常用


## 本地直接连接linux

```shell
ssh root@39.107.82.176
```



## 使用xshell上传网站

1. 安装：yum install lrzsz -y
2. 检查安装是否完成：rpm -qa | grep lrzsz
3. 基本操作：

* 上传：rz 直接弹出上传窗口
* 下载：sz 直接弹出下载窗口



## 本地cmd直接操作文件上传

```shell
# 下载文件
scp root@107.172.27.254:/home/test.txt . 
# 上传文件
scp test.txt root@107.172.27.254:/home    
# 下载目录
scp -r root@107.172.27.254:/home/test .    
# 上传目录
scp -r test root@107.172.27.254:/home    
# 上传当前目录所有文件和目录到远程
scp -r * root@39.107.82.176:/home
```
解决scp不需要输入密码直接上传
1. 在linux输入
```shell
ssh-keygen -t rsa
cd /root/.ssh
```
2. 在本地执行以下命令，并一路回车创建ssh密钥
```shell
ssh-keygen -t rsa
```
之后到C:\Users\Administrator\.ssh，输入以下命令
```shell
scp id_rsa.pub root@39.107.82.176
```
3. 文件上传之后到linux输入命令
```shell
cd /root/.ssh
cat id_rsa.pub >> authorized_keys
```
4. 已经可以测试不输入密码直接上传了



## 本地直接打包加上传

```shell
# 切换到build目录里
$ cd ./build
$ tar -cvf build.gz *
# 上传到www/wwwroot/chart目录
$ scp build.gz root@39.107.82.176:/www/wwwroot/chart
# 连接到linux,并输入密码
$ ssh root@39.107.82.176
# 切换到www/wwwroot/chart目录
cd /www/wwwroot/chart && ls
# 解压
tar -xvf build.gz
```



## 填写脚本自动上传

1. 本地脚本，在项目根目录创建文件夹delony.sh，只要是sh后缀都行
```shell
#!bin/bash
npm run build
cd ./build
tar -cvf build.gz *
scp build.gz root@39.107.82.176:/www/wwwroot/chart
ssh root@39.107.82.176
```
2. 运行之后会直接到服务器
```shell
touch delony.sh
chmod 777 delony.sh
vim delony.sh

// 写入以下代码
#!bin/bash
cd /www/wwwroot/chart
tar -xvf build.gz
rm -rf build.gz
```

3. 之后点击一下delony.sh，之后在到服务器运行：sh ./delony.sh即可



## Centos保持node项目后台运行

1. 安装：npm install forever -g（建议先设置好npm包源为淘宝源）
2. 使用方法

（1）启动：forever start app.js （有两个warn不用管）

![image](http://notecdn.heny.vip/images/server-03 linux常用-01.png)

（2）查看运行的项目：forever list

（3）停止服务：forever stop [pid]

（4）停止所有forever服务：forever stopall




## node项目保持后台运行

1. 全局安装：npm install forever -g

2. 启动某个项目：forever start 文件名

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-01.png)

3. 查看后台运行的项目：forever list

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-02.png)

4. 停止某个项目：forever stop [pid]

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-03.png)

5. 停止所有项目：forever stopall

