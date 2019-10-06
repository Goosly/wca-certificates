Print certificates for WCA competitions
Hosted at: https://goosly.github.io/wca-certificates/

# Development

To run locally:
1) > ng serve

2) Navigate to http://localhost:4200/

To build & deploy to github pages:
1) > ng build -c=production

2) Move content of 'demo' directory to parent

3) Commit & push to master

4) > git subtree push --prefix dist origin gh-pages

This pushes the 'dist' directory to a branch called 'gh-pages', which will trigger a build by GitHub Pages
