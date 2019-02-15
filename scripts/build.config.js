const pkg = require('../package.json')

const ns = pkg.name

const libName = 'fd'
const fileName = 'dialog'

module.exports = {
  ns,
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
