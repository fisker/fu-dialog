const pkg = require('../package.json')

const libName = 'dialog'
const fileName = libName

module.exports = {
  libName,
  fileName,
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
  banner: `/*! ${pkg.name} v${pkg.version} | ${pkg.author} | ${
    pkg.license
  } License */`,
}
