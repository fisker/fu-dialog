const path = require('path')
const writePkg = require('write-pkg').sync
const mem = require('mem')
const pkg = require('../package.json')
const buildConfig = require('./build.config')

const getEntryByFormat = mem(function getEntryByFormat(format) {
  const [version] = buildConfig.versions
  let fileName = ''

  if (format === 'css') {
    fileName = `${buildConfig.fileName}.min.css`
  } else {
    const build = buildConfig.builds[format] || buildConfig.builds.umd
    fileName = [build.dist, build.minify ? 'min' : '', build.ext]
      .filter(Boolean)
      .join('.')
  }

  return [buildConfig.dist, version.dist, fileName].join('/')
})

const entries = {
  main: 'cjs',
  module: 'esm',
  unpkg: 'umd',
  style: 'css',
  browser: 'umd',
  jsdelivr: 'umd',
}

Object.keys(entries)
  .map(entry => ({
    entry,
    format: entries[entry],
  }))
  .forEach(({entry, format}) => {
    if (format) {
      pkg[entry] = getEntryByFormat(format)
    } else {
      delete pkg[entry]
    }
  })

writePkg(path.join(__dirname, '../package.json'), pkg)
