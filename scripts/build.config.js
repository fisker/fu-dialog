const pkg = require('../package.json')

const libName = 'fDialog'

module.exports = {
  libName,
  fileName: pkg.name,
  versions: [
    {
      dist: 'full',
      entry: 'full-version',
    },
    {
      dist: 'pure',
      entry: 'pure-version',
    },
  ],
  dist: 'lib',
  src: 'src',
  defaultVersion: 'full',
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  banner: `/*! ${libName} v${pkg.version} | ${pkg.author} | ${
    pkg.license
  } License */`,
}
