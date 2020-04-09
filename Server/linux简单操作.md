## node项目保持后台运行

1. 全局安装：npm install forever -g

2. 启动某个项目：forever start 文件名

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-01.png)

3. 查看后台运行的项目：forever list

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-02.png)

4. 停止某个项目：forever stop [pid]

   ![image](http://notecdn.heny.vip/images/linux%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-03.png)

5. 停止所有项目：forever stopall

