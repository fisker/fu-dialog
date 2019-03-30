# build css

# full-version
sass src/styles/full-version.scss .cache/full-version.css --source-map .cache
postcss .cache/full-version.css --output lib/full-version/dialog.css --config scripts
prettier lib/full-version/dialog.css --write
postcss .cache/full-version.css --output lib/full-version/dialog.min.css --env MINIFY --config scripts

# pure-version
sass src/styles/pure-version.scss .cache/pure-version.css --source-map .cache
postcss .cache/pure-version.css --output lib/pure-version/dialog.css --config scripts
prettier lib/pure-version/dialog.css --write
postcss .cache/pure-version.css --output lib/pure-version/dialog.min.css --env MINIFY --config scripts
