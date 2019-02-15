# build css
node-sass src/styles/full-version.scss lib/full/f-dialog.css --output-style expanded --source-map lib/full/
node-sass src/styles/pure-version.scss lib/pure/f-dialog.css --output-style expanded --source-map lib/pure/
prettier lib/{full,pure}/f-dialog.css --write

# minify css
cssnano lib/full/f-dialog.css lib/full/f-dialog.min.css
cssnano lib/pure/f-dialog.css lib/pure/f-dialog.min.css
