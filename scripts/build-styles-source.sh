# copy scss
node scripts/build-styles-source.js
prettier lib/styles/**/*.{less,scss} --write
