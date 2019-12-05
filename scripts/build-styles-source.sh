# copy scss
node scripts/build-styles-source.js
prettier dist/styles/**/*.{less,scss} --write
