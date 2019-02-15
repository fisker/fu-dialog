const fs = require('fs')
const path = require('path')
const stringify = require('fast-json-stable-stringify')
const pkg = require('../package.json')
const buildConfig = require('./build.config')

const files = ['.css', '.css.map', '.js', '.js.map', '.min.css', '.min.js']

const allFiles = buildConfig.versions
  .reduce(
    (all, version) => {
      return all.concat(
        files.map(
          file =>
            `${buildConfig.dist}/${version.dist}/${buildConfig.fileName}${file}`
        )
      )
    },
    [
      'package.json',
      `${buildConfig.dist}/styles/_${buildConfig.fileName}.scss`,
      `${buildConfig.dist}/styles/_dialog-polyfill.scss`,
    ]
  )
  .sort()

pkg.files = allFiles
pkg.main = `${buildConfig.dist}/${buildConfig.defaultVersion}/${
  buildConfig.fileName
}.min.js`

fs.writeFileSync(
  path.join(__dirname, '../package.json'),
  stringify(pkg),
  'UTF-8'
)
