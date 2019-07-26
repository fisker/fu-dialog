// eslint-disable-next-line import/no-extraneous-dependencies
import Promise from 'es6-promise'
// eslint-disable-next-line import/no-extraneous-dependencies
import dialogPolyfill from 'dialog-polyfill'

import environment from './core/environment'
import assign from './utils/assign'
import exportModule from './core/export-module'

assign(environment, {
  Promise,
  dialogPolyfill,
})

export default exportModule()
