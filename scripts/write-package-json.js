const fs = require('fs')
const path = require('path')
const stringify = require('fast-json-stable-stringify')
const pkg = require('../package.json')
const buildConfig = require('./build.config')

function getFile(format) {
  const ext = {
    cjs: '.cjs.min.js',
    esm: '.esm.min.js',
    umd: '.umd.min.js',
    css: '.min.css',
  }[format]

  return `${buildConfig.dist}/${buildConfig.versions[0].dist}/${
    buildConfig.fileName
  }${ext}`
}

pkg.main = getFile('cjs')
pkg.module = getFile('esm')
pkg.unpkg = getFile('umd')
pkg.style = getFile('css')

fs.writeFileSync(
  path.join(__dirname, '../package.json'),
  stringify(pkg),
  'UTF-8'
)
