#!/usr/bin/env sh
set -e

# 上传
git add .
git commit -m '添加内容'
git push

# 部署
vuepress build .

cd ./.vuepress/dist

git init 
git add -A
git commit -m 'deploy'

git push -f git@github.com:heny/h-note.git master:gh-pages

cd -