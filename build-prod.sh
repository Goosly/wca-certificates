rm -r dist/*

ng build -c=production
mv dist/demo/* dist/

git add *
git commit -m "build"
git push

git subtree push --prefix dist origin gh-pages
