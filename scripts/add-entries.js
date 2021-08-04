import path from 'node:path'
import writePackage from 'write-pkg'
import mem from 'mem'
import createEsmUtils from 'esm-utils'
import buildConfig from './build.config.cjs'

const {json, __dirname} = createEsmUtils(import.meta)
const package_ = json.loadSync('../package.json')

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

for (const {entry, format} of Object.keys(entries).map((entry) => ({
  entry,
  format: entries[entry],
}))) {
  if (format) {
    package_[entry] = getEntryByFormat(format)
  } else {
    delete package_[entry]
  }
}

writePackage.sync(path.join(__dirname, '../package.json'), package_)
