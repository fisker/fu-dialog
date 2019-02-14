cd ..
rm -rf ./lib
mkdir lib
rollup --config rollup.config.js
uglifyjs lib/index.js
node-sass src/index.scss lib/index.css --output-style expanded
cd ./scripts
