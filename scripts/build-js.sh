

# build js
rollup --config rollup.config.js

# prettier
prettier "lib/**/*.{mjs,js}" --write

# minify js
# uglifyjs --compress --mangle --output lib/full-version/dialog.umd.min.js --ie8 lib/full-version/dialog.umd.js
