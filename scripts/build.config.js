const createBanner = require('create-banner')
const package_ = require('../package.json')

const {version} = package_

const ns = package_.name

const libraryName = 'fd'
const fileName = 'dialog'

const banner = {
  full: createBanner({
    template: 'simple',
  }),
  mini: createBanner({
    template: 'inline',
  }),
}

const dist = 'dist'
const source = 'src'

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
  libName: libraryName,
  fileName,
  dist,
  src: source,
  version,
  banner,
  builds,
  versions,
}
