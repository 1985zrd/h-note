# nginx配置

## 搭建静态站点

```nginx
# 虚拟主机server块
server {
    # 端口
    listen   8080;
    # 匹配请求中的host值
    server_name  localhost;
    
    # 监听请求路径
    location / {
        # 查找目录
        root /source;
        # 默认查找
        index index.html index.htm;
    }
}
```

* `server` 配置虚拟主机的相关参数，可以有多个
* `server_name` 通过请求中的host值 找到对应的虚拟主机的配置
* `location` 配置请求路由，处理相关页面情况
* `root` 查找资源的路径

配置完之后执行`nginx -t`查看是否有错误，如果看到下面的就是成功了

```sh
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

然后执行`nginx -s reload`更新Nginx配置文件

> `nginx -t` 检查配置文件是否有语法错误
> `nginx -s reload` 向主进程发送信号，重新加载配置文件
> `nginx -s stop` 快速关闭
> `nginx -s quit` 等待工作进程处理完成后关闭



## 动态匹配（请求过滤）

> 通常在开发环境或者测试环境的时候呢我们修改了代码，因为浏览器缓存，可能不会生效，需要手动清除缓存，才能看到修改后的效果，这里我们做一个配置让浏览器不缓存相关的资源。





## 配置nginx反向代理

注意api必须加上，检查api的地方，修改之后记得重启nginx服务器；

```nginx
location /api {
    rewrite ^.+api/?(.*)$ /$1 break;
    proxy_pass http://39.107.127.240:3000;
    # 作用和proxyTable差不多  上传时记得删除这句话
}
```

## nginx常用配置

```nginx
server {
    listen 80;
    server_name wyy.heny.vip;

    # 避免非root路径404
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 解决跨域
    location /api {
        proxy_pass http://wyy.heny.vip;
    }

    # 为带hash值的文件配置永久缓存
    location ~* \.(?:css|js)$ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public";
    }

    location ~ ^.+\..+$ {
        try_files $uri =404;
    }
}
```

## 配置文件

```nginx
# 定义 nginx 运行的用户和用户组
# user  nginx;
# CPU 总核心数
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
# 进程文件
pid        /var/run/nginx.pid;


events {
    # 最大访问量
    worker_connections  1024;
}

http: {
  upstream jsanntq {
    # upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。
    server 192.168.1.20:80 weight=3;
    server 192.168.1.21:80 weight=2;
    server 192.168.1.22:80 weight=3;
  }
  upstream jsanntqAdmin{
    # 标记为备份服务器。当主服务器不可用时，将传递与备份服务器的连接。
    backup;
    # 保持会话，保证同一客户端始终访问一台服务器。
    ip_hash;
    # 优先分配最少连接数的服务器，避免服务器超载请求过多。
    least_conn;
    # 设置服务器的权重，默认为1，权重大的会被优先分配。
    server 192.168.1.20:80 weight=3;
  }
  server {
    # 端口
    # 如果 Host 头部不匹配任何一个 server_name ,Nginx 将请求路由到默认虚拟服务器。
    # 默认虚拟服务器是指：nginx.conf 文件中第一个 server 或者 显式用 default_server 声明
    listen      80 default_server;
    #域名
    server_name www.jsanntq.cn
    # 开启gzip 压缩
    gzip on;
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    # 设置压缩级别，压缩级别越高压缩时间越长  （1-9）
    gzip_comp_level 4;
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    # 设置压缩文件的类型  （text/html)
    gzip_types text/plain application/javascript text/css;

    location / {
        # 查找目录
        root /data/www/blog;
        # vue-router history模式配置
        try_files $uri $uri/ /admin/index.html;
    }

    location /blog {
        # 代理 proxy_pass指令的参数为：协议+主机名+端口号
        # jsanntq对应upstream后定义的名称
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_pass http://jsanntq;

        try_files $uri $uri/ /blog/index.html;
    }

    location /admin/ {
      proxy_pass http://jsanntqAdmin;
      try_files $uri $uri/ /admin/index.html;
    }
  }
  # 多服务配置 用于配置多个项目
  server {
    listen      80;
    #多域名
    server_name ts.jsanntq.cn blog.jsanntq.cn
    location / {
        proxy_pass http://localhost:8080;
    }
  }
}
```



## 配置参数

```nginx
server 		# 配置虚拟主机的相关参数，可以有多个 
server_name # 通过请求中的host值 找到对应的虚拟主机的配置 
location 	# 配置请求路由，处理相关页面情况 
root 		# 查找资源的路径
```

## 常用指令

```sh
nginx -t 		# 检查配置文件是否有语法错误 
nginx -s reload # 向主进程发送信号，重新加载配置文件 
nginx -s stop 	# 快速关闭 
nginx -s quit	# 等待工作进程处理完成后关闭
```



## 常见问题

### 解决socket中nginx转发问题

```nginx
server {
    listen       80;
    server_name  school.godotdotdot.com;
    charset utf-8;

    location ~ / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 60;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```



## 参考链接

* http://jsanntq.cn/2020/04/07/Nginx/

* [快狗打车前端团队 前端想要了解的Nginx](https://juejin.im/post/5cae9de95188251ae2324ec3)

  