import defaultSettings from './default-settings'
import {assign, getType, isArrayLike} from './shared'
import * as classNames from './classnames'
import {createElement} from './dom'
import {registerDialog} from './polyfill'

import {on} from './dom'

export function parseDialogOptions(
  options,
  defaultOptions = {
    title: defaultSettings.title,
  }
) {
  const type = getType(options)

  if (type !== 'Object') {
    options = {
      message: options,
    }
  }

  options = assign(defaultOptions, options)

  return options
}
export function createAction(actionText, props, action) {
  if (typeof props === 'function') {
    action = props
    props = {}
  }

  props = assign(
    {
      type: 'button',
      className: '',
      textContent: String(actionText),
    },
    props
  )

  props.className = classNames.ACTION + ' ' + props.className

  const el = createElement('button', props)

  return {
    el: el,
    action: action,
  }
}

function createTypedAction(type) {
  let typedActionClassName = ''

  if (type === 'confirm') {
    typedActionClassName = classNames.ACTION_TYPE_CONFIRM
  } else if (type === 'cancel') {
    typedActionClassName = classNames.ACTION_TYPE_CANCEL
  }

  return function(actionText, action) {
    if (typeof actionText === 'function') {
      action = actionText
      actionText = null
    }

    actionText = actionText || defaultSettings[type + 'ActionText']

    return createAction(
      actionText,
      {
        className: typedActionClassName,
      },
      action
    )
  }
}

export const createConfirmAction = createTypedAction('confirm')
export const createCancelAction = createTypedAction('cancel')

function renderAction(container, btn, dialog) {
  if (typeof btn === 'string') {
    btn = {
      text: btn,
    }
  }

  if (isArrayLike(btn)) {
    return renderAction(container, btn[0], dialog)
  }

  if ('nodeType' in btn) {
    btn = {
      el: btn,
    }
  }

  if (typeof btn.el === 'function') {
    btn.el = btn.el()
  }

  if (typeof btn === 'function') {
    btn = createConfirmAction(btn)
  }

  if (!btn.el) {
    btn = createAction(btn.text, btn.action)
  }

  let {el, action} = btn

  if (action === false) {
    action = returnFalse
  }

  on(el, 'click', function() {
    let result

    if (action) {
      result = action.call(dialog)
    }

    if (result !== false) {
      dialog.remove()
    }
  })

  container.appendChild(el)
}

function renderActions(container, actions, dialog) {
  actions.forEach(function(action) {
    renderAction(container, action, dialog)
  })
}

export class Dialog {
  constructor(options, open) {
    const dialog = this

    options = parseDialogOptions(options)

    const hasTitle = !(
      options.title === null ||
      options.title === false ||
      typeof options.title === 'undefined'
    )
    const hasContent = options.content
    const hasMessage = 'message' in options
    const actions = options.actions || []
    let hasCloseButton = options.closeButton

    if (typeof hasCloseButton !== 'boolean') {
      hasCloseButton = defaultSettings.closeButton
    }

    const container = createElement('dialog', classNames.CONTAINER)
    registerDialog(container)
    this.container = container

    if (hasCloseButton) {
      const closeButton = createElement(container, 'button', {
        type: 'button',
        className: classNames.CLOSE_BTN,
        innerHTML: '<span>close</span>',
      })

      on(closeButton, 'click', function() {
        if (options.onClose) {
          options.onClose()
        }
        dialog.remove()
      })
    }

    // head
    if (hasTitle) {
      const head = createElement(container, 'div', classNames.HEAD)
      this.head = head

      const title = createElement(head, 'div', {
        className: classNames.TITLE,
        textContent: String(options.title),
      })
    }

    // body
    if (hasContent || hasMessage) {
      const body = createElement(container, 'div', classNames.BODY)
      this.body = body

      if (hasContent) {
        appendElement(body, options.content)
      } else if (hasMessage) {
        const message = createElement(body, 'div', classNames.MESSAGE)
        const messageBody = createElement(message, 'span', {
          className: classNames.MESSAGE_BODY,
          textContent: String(options.message),
        })
      }
    }

    // foot
    if (actions.length) {
      const foot = createElement(container, 'div', classNames.FOOT)
      this.foot = foot

      const actionsContainer = createElement(foot, 'div', classNames.ACTIONS)

      renderActions(actionsContainer, options.actions, dialog)
    }

    document.body.appendChild(this.container)

    if (open !== false) {
      this.open()
    }
  }

  open() {
    this.container.showModal()
  }

  remove() {
    this.container.parentNode.removeChild(this.container)
  }

  close() {
    this.container.close()
  }
}
