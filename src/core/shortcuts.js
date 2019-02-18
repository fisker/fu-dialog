import noop from '../utils/noop'
import * as classNames from './classnames'
import createElement from '../dom/create-element'
import addClass from '../dom/add-class'
import appendElement from '../dom/append-elements'
import defaults from './defaults'
import Dialog from './dialog'
import {createConfirmAction, createCancelAction} from './create-action'
import parseDialogOptions from './parse-options'

function alert(options, onAction = noop) {
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

function confirm(options, onAction = noop) {
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

    if (defaults.reverseActions) {
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

function prompt(options, onAction = noop) {
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
        placeholder: options.placeholder || defaults.promptPlaceholder,
      })
    } else {
      input = createElement('input', {
        className: classNames.INPUT,
        placeholder: options.placeholder || defaults.promptPlaceholder,
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

    if (defaults.reverseActions) {
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

export {alert, confirm, prompt}
