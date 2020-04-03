#!/usr/bin/env sh
set -e
vuepress build .

cd ./.vuepress/dist

git init 
git add -A
git commit -m 'deploy'

git push -f git@github.com:heny/h-note.git master:gh-pages

cd -