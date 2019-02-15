const fs = require('fs')
const stringify = require('fast-json-stable-stringify')
const pkg = require('../package.json')
const buildConfig = require('./build.config')

const files = ['.css', '.css.map', '.js', '.js.map', '.min.css', '.min.js']

const allFiles = buildConfig.versions
  .reduce(
    (all, version) => {
      return all.concat(
        files.map(file => `${version.dist}/${buildConfig.fileName}${file}`)
      )
    },
    [
      'package.json',
      `styles/_${buildConfig.fileName}.scss`,
      'styles/_dialog-polyfill.scss',
    ]
  )
  .sort()

pkg.files = allFiles

pkg.main = `${buildConfig.defaultVersion}/${buildConfig.fileName}.min.js`
delete pkg.scripts
delete pkg.dependencies
delete pkg.devDependencies

fs.writeFileSync('lib/package.json', stringify(pkg), 'UTF-8')
