const path = require('path')
const fs = require('fs')
const buildConfig = require('./build.config')
const cpFile = require('cp-file')
const scss2less = require('less-plugin-sass2less/lib/')

const distFolder = path.join(__dirname, '..', buildConfig.dist, 'styles')
const srcFolder = path.join(__dirname, '..', buildConfig.src, 'styles')

cpFile.sync(
  require.resolve('dialog-polyfill/dialog-polyfill.css'),
  path.join(distFolder, 'scss/_dialog-polyfill.scss')
)

// cpFile.sync(
//   require.resolve('dialog-polyfill/dialog-polyfill.css'),
//   path.join(distFolder, 'less/_dialog-polyfill.less')
// )

copyScss(
  path.join(srcFolder, '_dialog.scss'),
  path.join(distFolder, 'scss/_dialog.scss')
)

function copyScss(source, dist) {
  const content = fs.readFileSync(source, 'UTF-8')
  fs.writeFileSync(dist, buildConfig.banner.full + '\n' + content, 'UTF-8')
}

function convertScss2Less(scssFile, lessFile) {
  const scssSource = fs.readFileSync(scssFile, 'UTF-8')
  const converter = new scss2less()
  let lessSource = converter.process(scssSource, {
    fileInfo: {filename: path.basename(scssFile)},
  })

  lessSource = lessSource.replace(/@content/g, '@content()')
  lessSource = lessSource.replace(
    '.dialog-backdrop()',
    '.dialog-backdrop(@content)'
  )

  fs.writeFileSync(
    lessFile,
    buildConfig.banner.full + '\n' + lessSource,
    'UTF-8'
  )
}

// convertScss2Less(
//   path.join(srcFolder, '_dialog.scss'),
//   path.join(distFolder, 'less/_dialog.less')
// )
