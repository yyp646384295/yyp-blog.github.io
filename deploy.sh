#!/usr/bin/env sh

# 忽略错误
set -e

git add .
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/yyp646384295/yyp-blog.github.io.git master

cd -
