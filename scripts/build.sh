cd ..
rm -rf ./lib
mkdir lib

# build js
rollup --config rollup.config.js
prettier lib/f-dialog.js --write

# build css
node-sass src/index.scss lib/f-dialog.css --output-style expanded --source-map lib
prettier lib/f-dialog.css --write

# minify js
uglifyjs --compress --mangle --output lib/f-dialog.min.js --ie8 -- lib/f-dialog.js

# minify css
cssnano lib/f-dialog.css lib/f-dialog.min.css

cd ./scripts
