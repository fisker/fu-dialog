# build css
node-sass src/styles/full-version.scss lib/full/dialog.css --output-style expanded --source-map lib/full/
node-sass src/styles/pure-version.scss lib/pure/dialog.css --output-style expanded --source-map lib/pure/
prettier lib/{full,pure}/dialog.css --write

# minify css
cssnano lib/full/dialog.css lib/full/dialog.min.css
cssnano lib/pure/dialog.css lib/pure/dialog.min.css
