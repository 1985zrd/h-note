#!/bin/bash
npm run build
cd .vuepress/dist/
tar -cvf build.gz *
scp build.gz root@39.107.82.176:/www/wwwroot/web
