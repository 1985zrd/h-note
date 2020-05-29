#!/bin/bash
npm run build
cd .vuepress/dist/
# 微信文件
# echo 'kJWAqQeOLCK1S5cH' > MP_verify_kJWAqQeOLCK1S5cH.txt
tar -cvf build.gz *
scp build.gz root@39.107.82.176:/data/html/web
# 监听是否有SUCCESS.txt文件
echo 'success' > SUCCESS
scp SUCCESS root@39.107.82.176:/data/html/web
