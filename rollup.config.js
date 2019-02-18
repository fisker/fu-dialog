// rollup.config.js

import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import babelMinify from 'rollup-plugin-babel-minify'
import {terser} from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'

const buildConfig = require('./scripts/build.config')
const builds = Object.keys(buildConfig.builds).map(format =>
  Object.assign(
    {
      format,
    },
    buildConfig.builds[format]
  )
)

function rolllupPlugins({minify}) {
  return [
    commonjs({
      include: [
        'node_modules/dialog-polyfill/**',
        'node_modules/es6-promise/**',
      ],
    }),
    json(),
    nodeResolve(),
    babel(),
    minify
      ? babelMinify({
          comments: false,
          sourceMap: false,
        })
      : null,
    // analyze(),
  ]
}

function rollupOutput({version, build, minify}) {
  if (minify && !build.minify) {
    return null
  }

  const banner = buildConfig.banner[minify ? 'mini' : 'full']
  const filename = [build.dist, minify ? 'min' : '', build.ext]
    .filter(Boolean)
    .join('.')

  const file = `${buildConfig.dist}/${version.dist}/${filename}`
  const name = buildConfig.libName
  const sourcemap = !minify
  const {format} = build

  return {
    banner,
    file,
    name,
    format,
    sourcemap,
    legacy: true,
    strict: true,
    treeshake: true,
  }
}

function buildVersion(version, minify) {
  return {
    input: `${buildConfig.src}/${version.entry}.js`,
    output: builds
      .filter(build => {
        if (minify && !build.minify) {
          return false
        }
        return true
      })
      .map(build =>
        rollupOutput({
          version,
          build,
          minify,
        })
      ),
    plugins: rolllupPlugins({
      minify,
    }),
  }
}

const versions = buildConfig.versions.map(version =>
  buildVersion(version, false)
)

const minVersions = buildConfig.versions.map(version =>
  buildVersion(version, true)
)

export default [...versions, ...minVersions].filter(
  config => config.output.length
)
