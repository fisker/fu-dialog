import env from './core/env'
import globalThis from './utils/global-this'
import assign from './utils/assign'
import exportModule from './core/export-module'

const {Promise, dialogPolyfill} = globalThis

assign(env, {
  Promise,
  dialogPolyfill,
})

export default exportModule()
