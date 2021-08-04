import assign from '../utils/assign.js'
import Dialog from './dialog.js'
import shortCutWrapper from './shortcut-wrapper.js'
import defaults, {setDefaults} from './defaults.js'
import {alert, confirm, prompt} from './shortcuts.js'
import createAction, {
  createConfirmAction,
  createCancelAction,
} from './create-action.js'
import environment, {setEnvironment} from './environment.js'

function exportModule() {
  function dialog(options) {
    return new Dialog(options)
  }

  assign(dialog, {
    env: environment,
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
