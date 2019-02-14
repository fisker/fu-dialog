import {
  Dialog,
  parseDialogOptions,
  createConfirmAction,
  createCancelAction,
} from './dialog'
import {noop} from './shared'
import * as classNames from './classnames'
import {createElement, addClass, appendElement} from './dom'
import defaultSettings from './default-settings'

export function alert(options, onAction = noop) {
  options = parseDialogOptions(options)

  if (!options.actions) {
    const confirmBtn = createConfirmAction(onAction)

    options.actions = [confirmBtn]
  }

  options.onClose = onAction

  const dialog = new Dialog(options)

  addClass(dialog.container, classNames.DIALOG_TYPE_ALERT)

  return dialog
}

export function confirm(options, onAction = noop) {
  options = parseDialogOptions(options)

  function onConfirm() {
    return onAction.call(this, true)
  }

  function onCancel() {
    return onAction.call(this, false)
  }

  if (!options.actions) {
    const confirmBtn = createConfirmAction(onConfirm)
    const cancelBtn = createCancelAction(onCancel)

    if (defaultSettings.reverseActions) {
      options.actions = [cancelBtn, confirmBtn]
    } else {
      options.actions = [confirmBtn, cancelBtn]
    }
  }

  options.onClose = onCancel

  const dialog = new Dialog(options)

  addClass(dialog.container, classNames.DIALOG_TYPE_CONFIRM)

  return dialog
}

export function prompt(options, onAction = noop) {
  options = parseDialogOptions(options, {
    title: null,
    closeButton: false,
  })

  if (!options.content && !('message' in options)) {
    options.content = []
  }

  let {input} = options

  if (!input) {
    if (options.rows) {
      input = createElement('textarea', {
        className: classNames.INPUT,
        rows: options.rows,
        placeholder: options.placeholder || defaultSettings.promptPlaceholder,
      })
    } else {
      input = createElement('input', {
        type: 'text',
        className: classNames.INPUT,
        placeholder: options.placeholder || defaultSettings.promptPlaceholder,
      })
    }
  }

  function onConfirm() {
    return onAction.call(this, input.value)
  }

  function onCancel() {
    return onAction.call(this)
  }

  if (!options.actions) {
    const confirmBtn = createConfirmAction(onConfirm)

    const cancelBtn = createCancelAction(onCancel)

    if (defaultSettings.reverseActions) {
      options.actions = [cancelBtn, confirmBtn]
    } else {
      options.actions = [confirmBtn, cancelBtn]
    }
  }

  options.onClose = onCancel

  const dialog = new Dialog(options, false)

  addClass(dialog.container, classNames.DIALOG_TYPE_PROMPT)
  appendElement(dialog.body, input)
  dialog.open()

  return dialog
}
