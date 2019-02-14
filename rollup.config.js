// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import pkg from './package.json'

const libName = 'fDialog'
const fileName = pkg.name

export default {
  input: 'src/index.js',
  output: {
    file: `lib/${fileName}.js`,
    format: 'umd',
    name: libName,
    sourcemap: true,
    banner: `/*! ${libName} v${pkg.version} | ${pkg.author} | ${
      pkg.license
    } License */`,
    legacy: true,
    strict: true,
  },
  plugins: [
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel(),
  ],
}
