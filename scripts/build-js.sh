

# build js
rollup --config rollup.config.js
prettier lib/{full,pure}/f-dialog.js --write

# minify js
uglifyjs --compress --mangle --output lib/full/f-dialog.min.js --ie8 lib/full/f-dialog.js
uglifyjs --compress --mangle --output lib/pure/f-dialog.min.js --ie8 lib/pure/f-dialog.js

