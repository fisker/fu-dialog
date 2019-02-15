// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

const buildConfig = require('./scripts/build.config')

const rolllupPlugins = [
  commonjs({
    include: 'node_modules/**',
  }),
  json(),
  nodeResolve(),
  babel(),
]

const versions = buildConfig.versions.map(version => ({
  input: `${buildConfig.src}/${version.entry}.js`,
  output: {
    file: `${buildConfig.dist}/${version.dist}/${buildConfig.fileName}.js`,
    format: 'umd',
    name: buildConfig.libName,
    sourcemap: true,
    banner: buildConfig.banner,
    legacy: true,
    strict: true,
    treeshake: true,
  },
  plugins: rolllupPlugins,
}))

export default versions
