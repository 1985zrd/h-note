#!/usr/bin/env sh
set -e

# 部署
vuepress build .

cd ./.vuepress/dist

git init 
git add -A
git commit -m 'deploy'

git push -f git@github.com:heny/h-note.git master:gh-pages

cd -