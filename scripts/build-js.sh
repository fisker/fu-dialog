# build js
rollup --config rollup.config.mjs

# prettier
prettier "dist/**/*.{mjs,js}" --write

# minify js
# uglifyjs --compress --mangle --output dist/full-version/dialog.umd.min.js --ie8 dist/full-version/dialog.umd.js
