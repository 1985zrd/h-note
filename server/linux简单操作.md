## node项目保持后台运行

1. 全局安装：npm install forever -g

2. 启动某个项目：forever start 文件名

   ![image-20200330103159685](static\linux简单操作-01.png)

3. 查看后台运行的项目：forever list

   ![image-20200330103418522](static\linux简单操作-02.png)

4. 停止某个项目：forever stop [pid]

   ![image-20200330104407506](static/linux简单操作-03.png)

5. 停止所有项目：forever stopall

