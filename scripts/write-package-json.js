const path = require('path')
const writePkg = require('write-pkg').sync
const mem = require('mem')
const pkg = require('../package.json')
const buildConfig = require('./build.config')

const getFile = mem(function getFile(format) {
  const ext = {
    cjs: '.cjs.min.js',
    esm: '.esm.min.js',
    umd: '.umd.min.js',
    css: '.min.css',
  }[format]

  return [
    buildConfig.dist,
    buildConfig.versions[0].dist,
    `${buildConfig.fileName}${ext}`,
  ].join('/')
})

const entries = (entries => {
  return Object.keys(entries).reduce((props, key) => {
    const format = entries[key]
    const file = getFile(format)
    props[key] = file
    return props
  }, {})
})({
  main: 'cjs',
  module: 'esm',
  unpkg: 'umd',
  style: 'css',
  browser: 'umd',
  jsdelivr: 'umd',
})

writePkg(path.join(__dirname, '../package.json'), Object.assign(pkg, entries))
