# build css

# full-version
npx sass src/styles/full-version.scss .cache/full-version.css
npx postcss .cache/full-version.css --output lib/full-version/dialog.css
npx prettier lib/full-version/dialog.css --write
npx postcss .cache/full-version.css --output lib/full-version/dialog.min.css --env MINIFY --config scripts

# pure-version
npx sass src/styles/pure-version.scss .cache/pure-version.css
npx postcss .cache/pure-version.css --output lib/pure-version/dialog.css
npx prettier lib/pure-version/dialog.css --write
npx postcss .cache/pure-version.css --output lib/pure-version/dialog.min.css --env MINIFY --config scripts
