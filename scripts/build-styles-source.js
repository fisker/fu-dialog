import path from 'node:path'
import fs from 'node:fs/promises'
import cpFile from 'cp-file'
import createEsmUtils from 'esm-utils'
import buildConfig from './build.config.cjs'
// const scss2less from 'less-plugin-sass2less/lib/')

const {require, __dirname} = createEsmUtils(import.meta)

const distFolder = path.join(__dirname, '..', buildConfig.dist, 'styles')
const sourceFolder = path.join(__dirname, '..', buildConfig.src, 'styles')

await cpFile(
  require.resolve('dialog-polyfill/dialog-polyfill.css'),
  path.join(distFolder, 'scss/_dialog-polyfill.scss'),
)

// cpFile.sync(
//   require.resolve('dialog-polyfill/dialog-polyfill.css'),
//   path.join(distFolder, 'less/_dialog-polyfill.less')
// )

await copyScss(
  path.join(sourceFolder, '_dialog.scss'),
  path.join(distFolder, 'scss/_dialog.scss'),
)

async function copyScss(source, dist) {
  const content = await fs.readFile(source, 'utf8')
  await fs.writeFile(dist, `${buildConfig.banner.full}\n${content}`)
}

// function convertScss2Less(scssFile, lessFile) {
//   const scssSource = fs.readFileSync(scssFile, 'utf8')
//   const converter = new scss2less()
//   let lessSource = converter.process(scssSource, {
//     fileInfo: {filename: path.basename(scssFile)},
//   })

//   lessSource = lessSource.replace(/@content/g, '@content()')
//   lessSource = lessSource.replace(
//     '.dialog-backdrop()',
//     '.dialog-backdrop(@content)'
//   )

//   fs.writeFileSync(
//     lessFile,
//     buildConfig.banner.full + '\n' + lessSource,
//     'utf8'
//   )
// }

// convertScss2Less(
//   path.join(srcFolder, '_dialog.scss'),
//   path.join(distFolder, 'less/_dialog.less')
// )
