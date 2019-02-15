import Dialog from './dialog'
import returnPromise from './return-promise'
import assign from '../utils/assign'
import identify from '../utils/identify'
import defaultSettings from './default-settings'
import setDefault from './set-default'
import {alert, confirm, prompt} from './shortcuts'
import createAction, {
  createConfirmAction,
  createCancelAction,
} from './create-action'
import env from './env'

function exportModule() {
  const shortCutWrapper = env.Promise ? returnPromise : identify

  function dialog(options) {
    return new Dialog(options)
  }

  assign(dialog, {
    defaultSettings,
    setDefault,
    dialog,
    Dialog,
    alert: shortCutWrapper(alert),
    confirm: shortCutWrapper(confirm),
    prompt: shortCutWrapper(prompt),
    action: assign(createAction, {
      confirm: createConfirmAction,
      cancel: createCancelAction,
    }),
    btn: {
      confirm: createConfirmAction(),
      cancel: createCancelAction(),
    },
  })

  return dialog
}

export default exportModule
