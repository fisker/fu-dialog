# copy scss
cp src/styles/_dialog.scss lib/styles/_f-dialog.scss
node scripts/copy-dialogpolyfill-css.js
prettier lib/styles/*.scss --write
