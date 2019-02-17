// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import minify from 'rollup-plugin-babel-minify'
import {terser} from 'rollup-plugin-terser'

const buildConfig = require('./scripts/build.config')

function rolllupPlugins(min) {
  return [
    commonjs({
      include: 'node_modules/**',
    }),
    json(),
    nodeResolve(),
    babel(),
    min
      ? minify({
          comments: false,
          sourceMap: false,
        })
      : null,
  ]
}

function rollupOutput({format, version, min}) {
  const banner = buildConfig.banner[min ? 'mini' : 'full']
  const filename = [buildConfig.fileName, format, min ? 'min' : '', 'js']
    .filter(Boolean)
    .join('.')
  const file = `${buildConfig.dist}/${version}/${filename}`
  const name = buildConfig.libName
  const sourcemap = !min

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

function buildVersion(versionConfig, min) {
  return {
    input: `${buildConfig.src}/${versionConfig.entry}.js`,
    output: buildConfig.formats.map(format =>
      rollupOutput({
        format,
        version: versionConfig.dist,
        min,
      })
    ),
    plugins: rolllupPlugins(min),
  }
}

const versions = buildConfig.versions.map(versionConfig =>
  buildVersion(versionConfig, false)
)
const minVersions = buildConfig.versions.map(versionConfig =>
  buildVersion(versionConfig, true)
)

export default versions.concat(minVersions)
