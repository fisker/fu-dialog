const createBanner = require('create-banner')
const pkg = require('../package.json')

const {version} = pkg

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

const dist = 'lib'
const src = 'src'

const builds = {
  cjs: {
    dist: `${fileName}.common`,
    minify: false,
    ext: 'js',
    standalone: false,
  },
  esm: {
    dist: `${fileName}.esm`,
    minify: true,
    ext: 'mjs',
    standalone: true,
  },
  umd: {
    dist: `${fileName}`,
    minify: true,
    ext: 'js',
    standalone: true,
  },
  // iife: {
  //   dist: `${fileName}.global`,
  //   minify: true,
  //   ext: 'js',
  //   standalone: true,
  // },
}

const versions = [
  {
    dist: 'full-version',
    entry: 'full-version',
  },
  {
    dist: 'pure-version',
    entry: 'pure-version',
  },
]

module.exports = {
  ns,
  libName,
  fileName,
  dist,
  src,
  version,
  banner,
  builds,
  versions,
}
