# build css

# full-version
yarn sass src/styles/full-version.scss .cache/full-version.css
yarn postcss .cache/full-version.css --output dist/full-version/dialog.css
yarn prettier dist/full-version/dialog.css --write
yarn postcss .cache/full-version.css --output dist/full-version/dialog.min.css --env MINIFY --config scripts

# pure-version
yarn sass src/styles/pure-version.scss .cache/pure-version.css
yarn postcss .cache/pure-version.css --output dist/pure-version/dialog.css
yarn prettier dist/pure-version/dialog.css --write
yarn postcss .cache/pure-version.css --output dist/pure-version/dialog.min.css --env MINIFY --config scripts
