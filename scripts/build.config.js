const createBanner = require('create-banner')
const pkg = require('../package.json')

const ns = pkg.name
const libName = 'fd'
const fileName = 'dialog'
const banner = {
  full: createBanner({
    template: 'simple',
  }),
  mini: createBanner({
    template: 'inline',
  }),
}

module.exports = {
  ns,
  libName,
  fileName,
  versions: [
    {
      dist: 'full-version',
      entry: 'full-version',
    },
    {
      dist: 'pure-version',
      entry: 'pure-version',
    },
  ],
  dist: 'lib',
  src: 'src',
  version: pkg.version,
  author: pkg.author,
  license: pkg.license,
  banner,
  formats: ['cjs', 'esm', 'umd', 'iife'],
}
