import Dialog from './dialog'
import shortCutWrapper from './shortcut-wrapper'
import assign from '../utils/assign'
import defaults, {setDefaults} from './defaults'
import {alert, confirm, prompt} from './shortcuts'
import createAction, {
  createConfirmAction,
  createCancelAction,
} from './create-action'
import env, {setEnvironment} from './env'

function exportModule() {
  function dialog(options) {
    return new Dialog(options)
  }

  assign(dialog, {
    env,
    setEnvironment,
    defaults,
    setDefaults,
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
