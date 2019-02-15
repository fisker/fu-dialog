import defaultSettings from './default-settings'
import document from '../utils/document'
import * as classNames from './classnames'

import createElement from '../dom/create-element'
import appendElement from '../dom/append-elements'
import addListener from '../dom/add-listener'
import parseDialogOptions from './parse-options'
import parseAction from './parse-action'
import renderAction from './render-action'
import env from './env'
import forEach from '../utils/for-each'

class Dialog {
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
    const actions = (options.actions || []).map(parseAction)
    let hasCloseButton = options.closeButton

    if (typeof hasCloseButton !== 'boolean') {
      hasCloseButton = defaultSettings.closeButton
    }

    const container = createElement('dialog', classNames.CONTAINER)

    if (env.dialogPolyfill && env.dialogPolyfill.registerDialog) {
      env.dialogPolyfill.registerDialog(container)
    }

    this.container = container

    if (hasCloseButton) {
      const closeButton = createElement(container, 'button', {
        className: classNames.CLOSE_BTN,
        innerHTML: '<span>close</span>',
      })

      addListener(closeButton, 'click', function() {
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

      forEach.call(actions, action =>
        renderAction(actionsContainer, action, dialog)
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
