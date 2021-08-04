import Promise from 'es6-promise'
import dialogPolyfill from 'dialog-polyfill'

import environment from './core/environment.js'
import assign from './utils/assign.js'
import exportModule from './core/export-module.js'

assign(environment, {
  Promise,
  dialogPolyfill,
})

export default exportModule()
