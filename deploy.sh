#!/usr/bin/env sh

set -e

npm run build 

cd dist 

git init 
git add -A
git commit -m 'New Vue Deployment'
git push -f git@github.com:alissa9/afterschool-frontend.git master:gh-pages

cd -

