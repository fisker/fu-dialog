import createEsmUtils from 'esm-utils'
import createBanner from 'create-banner'

const {json} = createEsmUtils(import.meta)

const package_ = json.loadSync('../package.json')

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
    dist: fileName,
    minify: false,
    ext: 'cjs',
    standalone: false,
  },
  esm: {
    dist: fileName,
    minify: true,
    ext: 'mjs',
    standalone: true,
  },
  umd: {
    dist: fileName,
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

export default {
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
