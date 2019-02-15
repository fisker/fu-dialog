const path = require('path')
const buildConfig = require('./build.config')
const cpFile = require('cp-file')

const cssfile = require.resolve('dialog-polyfill/dialog-polyfill.css')
const dist = path.join(
  __dirname,
  '..',
  buildConfig.dist,
  'styles/_dialog-polyfill.scss'
)

cpFile.sync(cssfile, dist)
