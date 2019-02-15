

# build js
rollup --config rollup.config.js
prettier lib/{full,pure}/dialog.js --write

# minify js
uglifyjs --compress --mangle --output lib/full/dialog.min.js --ie8 lib/full/dialog.js
uglifyjs --compress --mangle --output lib/pure/dialog.min.js --ie8 lib/pure/dialog.js

