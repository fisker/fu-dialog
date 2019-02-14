import {
  globalThis,
  forEach,
  toString,
  assign,
  document,
  noop,
  getType,
  isArrayLike,
  isArray,
  returnFalse,
} from './shared'

import {createElement, appendElement, addClass, on} from './dom'

import defaultSettings from './default-settings'

import {registerDialog, Promise} from './polyfill'

import {
  Dialog,
  createAction,
  createConfirmAction,
  createCancelAction,
} from './dialog'

import {alert, confirm, prompt} from './shortcuts'

export function setDefault(options, value) {
  if (arguments.length === 2) {
    options = {
      [options]: value,
    }
  }

  return assign(defaultSettings, options)
}

export function dialog(options) {
  return new Dialog(options)
}

function returnPromise(method) {
  return function(options, onAction = noop) {
    let dialog
    const promise = new Promise(resolve => {
      dialog = method(options, function(result) {
        resolve(result)
        return onAction.call(this, result)
      })
    })
    promise.dialog = dialog

    return promise
  }
}

assign(dialog, {
  dialog,
  Dialog,
  alert: returnPromise(alert),
  confirm: returnPromise(confirm),
  prompt: returnPromise(prompt),
  action: assign(createAction, {
    confirm: createConfirmAction,
    cancel: createCancelAction,
  }),
  btn: {
    confirm: createConfirmAction(),
    cancel: createCancelAction(),
  },
})

export default dialog
