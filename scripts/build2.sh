cd ..
rm -rf ./lib
mkdir lib
parcel build src/index.js --global fDialog --out-dir lib --detailed-report
node-sass src/index.scss lib/index.css --output-style expanded
cd ./scripts