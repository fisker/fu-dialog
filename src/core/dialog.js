import document from '../utils/document.js'
import createElement from '../dom/create-element.js'
import appendElement from '../dom/append-elements.js'
import addListener from '../dom/add-listener.js'
import preventEvent from '../dom/prevent-event.js'
import forEach from '../utils/for-each.js'
import * as classNames from './classnames.js'

import parseDialogOptions from './parse-options.js'
import parseAction from './parse-action.js'
import renderAction from './render-action.js'
import environment from './environment.js'

function registerDialog(dialog) {
  const {dialogPolyfill = {}} = environment
  const {registerDialog} = dialogPolyfill

  if (registerDialog) {
    return registerDialog(dialog)
  }

  return dialog
}

class Dialog {
  constructor(options, open) {
    options = parseDialogOptions(options)

    const hasTitle = !(
      options.title === null ||
      options.title === false ||
      typeof options.title === 'undefined'
    )
    const hasContent = options.content
    const hasMessage = 'message' in options
    const actions = (options.actions || []).map(parseAction)
    const {closeButton: closeButtonText = '', onClose} = options
    const {preventCancel, onCancel} = options

    const container = createElement('dialog', classNames.CONTAINER)
    registerDialog(container)

    if (preventCancel) {
      preventEvent(container, 'cancel')
    } else {
      addListener(container, 'cancel', () => {
        if (onCancel) {
          onCancel()
        }
        this.remove()
      })
    }

    this.container = container

    if (closeButtonText) {
      const closeButton = createElement(container, 'button', {
        className: classNames.CLOSE_BTN,
        innerHTML: `<span>${String(closeButtonText)}</span>`,
      })

      addListener(closeButton, 'click', () => {
        if (onClose) {
          onClose()
        }
        this.remove()
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
    if (actions.length !== 0) {
      const foot = createElement(container, 'div', classNames.FOOT)
      this.foot = foot

      const actionsContainer = createElement(foot, 'div', classNames.ACTIONS)

      forEach.call(actions, (action) =>
        renderAction(actionsContainer, action, this),
      )
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

export default Dialog
