import environment from './core/environment.js'
import globalThis from './utils/global-this.js'
import assign from './utils/assign.js'
import exportModule from './core/export-module.js'

const {Promise, dialogPolyfill} = globalThis

assign(environment, {
  Promise,
  dialogPolyfill,
})

export default exportModule()
