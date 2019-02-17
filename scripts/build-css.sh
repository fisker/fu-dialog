# build css

# full-version
node-sass src/styles/full-version.scss .cache/full-version.css --output-style expanded --source-map .cache
postcss .cache/full-version.css --output lib/full-version/dialog.css
prettier lib/full-version/dialog.css --write
postcss .cache/full-version.css --output lib/full-version/dialog.min.css --env MINIFY

# pure-version
node-sass src/styles/pure-version.scss .cache/pure-version.css --output-style expanded --source-map .cache
postcss .cache/pure-version.css --output lib/pure-version/dialog.css
prettier lib/pure-version/dialog.css --write
postcss .cache/pure-version.css --output lib/pure-version/dialog.min.css --env MINIFY
