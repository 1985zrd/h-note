#!/usr/bin/env sh
set -e

# 部署
vuepress build .

# 拉取下代码 防止出错
# git pull

cd ./.vuepress/dist

# 添加自定义域名转发
echo 'note.heny.vip' > CNAME

git init 
git add -A
git commit -m 'deploy'

git push -f git@github.com:heny/h-note.git master:gh-pages

cd -