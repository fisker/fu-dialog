import environment from './core/environment'
import globalThis from './utils/global-this'
import assign from './utils/assign'
import exportModule from './core/export-module'

const {Promise, dialogPolyfill} = globalThis

assign(environment, {
  Promise,
  dialogPolyfill,
})

export default exportModule()
