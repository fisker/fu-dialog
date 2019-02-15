# copy scss
cp src/styles/_dialog.scss lib/styles/_dialog.scss
node scripts/copy-dialogpolyfill-css.js
prettier lib/styles/*.scss --write
