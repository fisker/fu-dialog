/*!
 * fu-dialog v1.0.10
 * Copyright 2019 fisker
 * Released under the MIT license
 */

const env = {}

function setEnvironment(_ref) {
  const {Promise} = _ref
  const {dialogPolyfill} = _ref

  if (Promise) {
    env.Promise = Promise
  }

  if (dialogPolyfill) {
    env.dialogPolyfill = dialogPolyfill
  }
}

// eslint-disable-next-line no-new-func, unicorn/new-for-builtins
const globalThis = Function('return this')()

const {forEach} = Array.prototype
const forEach$1 =
  forEach ||
  function forEach(iteratee) {
    let i = 0
    const {length} = this

    for (; i < length; i++) {
      iteratee.call(this, this[i], i, this)
    }
  }

const {hasOwnProperty} = Object.prototype

function forIn(iteratee) {
  let key

  for (key in this) {
    if (hasOwnProperty.call(this, key)) {
      iteratee.call(this, this[key], key, this)
    }
  }
}

const {assign} = Object
const assign$1 =
  assign ||
  function assign(target) {
    for (
      var _len = arguments.length,
        sources = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      sources[_key - 1] = arguments[_key]
    }

    forEach$1.call(sources, function(source) {
      forIn.call(source, function(value, key) {
        target[key] = value
      })
    })
    return target
  }

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) {
      descriptor.writable = true
    }
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) {
    _defineProperties(Constructor.prototype, protoProps)
  }
  if (staticProps) {
    _defineProperties(Constructor, staticProps)
  }
  return Constructor
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }

  return obj
}

const name = 'fu-dialog'

const {document} = globalThis

if (!document) {
  throw new Error(''.concat(name, ' requires a window with a document.'))
}

const NS = 'fu'
const BLOCK = ''.concat(NS, '-dialog')
const CONTAINER = BLOCK
const HEAD = ''.concat(BLOCK, '__head')
const TITLE = ''.concat(BLOCK, '__title')
const BODY = ''.concat(BLOCK, '__body')
const MESSAGE = ''.concat(BLOCK, '__message')
const MESSAGE_BODY = ''.concat(BLOCK, '__message-body')
const INPUT = ''.concat(BLOCK, '__input')
const FOOT = ''.concat(BLOCK, '__foot')
const ACTIONS = ''.concat(BLOCK, '__actions')
const CLOSE_BTN = ''.concat(BLOCK, '__close')
const ACTION = ''.concat(BLOCK, '__action')
const ACTION_TYPE_CONFIRM = ''.concat(ACTION, '--confirm')
const ACTION_TYPE_CANCEL = ''.concat(ACTION, '--cancel')
const DIALOG_TYPE_ALERT = ''.concat(BLOCK, '--alert')
const DIALOG_TYPE_CONFIRM = ''.concat(BLOCK, '--confirm')
const DIALOG_TYPE_PROMPT = ''.concat(BLOCK, '--prompt')

const {toString} = Object.prototype

function getType(x) {
  return toString.call(x).slice(8, -1)
}

const {isArray} = Array
const isArray$1 =
  isArray ||
  function isArray(x) {
    return getType(x) === 'Array'
  }

const div = document.createElement('div')
const SUPPORTS_CLASS_LIST = 'classList' in div
const SUPPORTS_TEXT_CONTENT = 'textContent' in div

function parseClassNames() {
  const className =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  let classList = ''

  if (isArray$1(className)) {
    classList = className
  } else {
    classList = String(className || '').split(' ')
  }

  return classList
}

function parseDomProps() {
  let props =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

  if (isArray$1(props) || typeof props === 'string') {
    props = {
      className: props
    }
  }

  const classList = parseClassNames(props.className)

  if (classList.length) {
    props.className = classList.join(' ')
  } else {
    delete props.className
  }

  if (!SUPPORTS_TEXT_CONTENT && 'textContent' in props) {
    props.innerText = props.textContent
    delete props.textContent
  }

  return props
}

const defaultDomProps = {
  button: {
    type: 'button'
  },
  input: {
    type: 'text'
  }
}

function setDefaultProps(props, tagName) {
  const defaultProps = defaultDomProps[tagName]

  if (defaultProps) {
    props = assign$1({}, defaultProps, props)
  }

  return props
}

function createElement(parentNode, tagName) {
  let props =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

  if (typeof parentNode === 'string') {
    props = tagName
    tagName = parentNode
    parentNode = null
  }

  const el = document.createElement(tagName)
  props = parseDomProps(props)
  props = setDefaultProps(props, tagName)
  assign$1(el, props)

  if (parentNode) {
    parentNode.appendChild(el)
  }

  return el
}

const MAX_SAFE_INTEGER = 9007199254740991

function isLength(x) {
  return typeof x === 'number' && x > -1 && x % 1 === 0 && x <= MAX_SAFE_INTEGER
}

function isArrayLike(x) {
  return x && typeof x !== 'function' && isLength(x.length)
}

function isNode(x) {
  return x && typeof x.nodeType === 'number'
}

function appendElement(parent, children) {
  if (typeof children === 'string') {
    parent.innerHTML = children
    return parent
  }

  if (isNode(children)) {
    parent.appendChild(children)
    return parent
  }

  if (isArrayLike(children)) {
    forEach$1.call(children, function(child) {
      appendElement(parent, child)
    })
    return parent
  }

  return parent
}

const returnFalse = function() {
  return false
}

const returnTrue = function() {
  return true
}

// import {

function isListener(x) {
  return typeof x === 'function' || typeof x === 'boolean'
}

function parseListener(listener) {
  if (listener === true) {
    listener = returnTrue
  }

  if (listener === false) {
    listener = returnFalse
  }

  return listener
}

function addListener(el, type, listener) {
  let options =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

  if (isListener(type)) {
    options = listener || false
    listener = type
    type = 'click'
  }

  listener = parseListener(listener)
  el.addEventListener(type, listener, options)
  return el
}

function preventDefault(e) {
  e.preventDefault()
  return false
}

function preventEvent(el, type) {
  return addListener(el, type, preventDefault)
}

const defaults = {
  title: '提示',
  confirmActionText: '确定',
  cancelActionText: '取消',
  promptPlaceholder: '请输入',
  reverseActions: false,
  closeButton: '关闭',
  preventCancel: true
}

function setDefaults(options, value) {
  if (arguments.length === 2) {
    options = _defineProperty({}, options, value)
  }

  return assign$1(defaults, options)
}

function parseOptions(options) {
  const defaultOptions =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults
  const type = getType(options)

  if (type !== 'Object') {
    options = {
      message: options
    }
  }

  options = assign$1(defaultOptions, options)
  return options
}

const noop = function() {}

function createAction(actionText, props) {
  let action =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop

  if (typeof props === 'function') {
    action = props
    props = {}
  }

  if (action === false) {
    action = returnFalse
  }

  if (action === true) {
    action = returnTrue
  }

  props = assign$1(
    {
      textContent: String(actionText)
    },
    props
  )
  const classList = parseClassNames(props.className)
  classList.unshift(ACTION)
  props.className = classList
  const el = createElement('button', props)
  return {
    el,
    action
  }
}

function createTypedAction(type) {
  let typedActionClassName = ''

  if (type === 'confirm') {
    typedActionClassName = ACTION_TYPE_CONFIRM
  } else if (type === 'cancel') {
    typedActionClassName = ACTION_TYPE_CANCEL
  }

  return function(actionText, action) {
    const DEFAULT_TEXT = defaults[''.concat(type, 'ActionText')]

    if (typeof actionText === 'function') {
      action = actionText
      actionText = DEFAULT_TEXT
    }

    actionText = actionText || DEFAULT_TEXT
    return createAction(
      actionText,
      {
        className: typedActionClassName
      },
      action
    )
  }
}

const createConfirmAction = createTypedAction('confirm')
const createCancelAction = createTypedAction('cancel')

function parseAction(action) {
  if (typeof action === 'string') {
    action = {
      text: action
    }
  }

  if (isArrayLike(action)) {
    return parseAction(action[0])
  }

  if (isNode(action)) {
    action = {
      el: action
    }
  }

  if (typeof action.el === 'function') {
    action.el = action.el()
  }

  if (action === createConfirmAction || action === createCancelAction) {
    action = action()
  }

  if (typeof action === 'function' || typeof action === 'boolean') {
    action = createConfirmAction(action)
  }

  if (!action.el) {
    action = createAction(action.text, action.action)
  }

  return action
}

function renderAction(container, btn, dialog) {
  const {el} = btn
  const {action} = btn
  addListener(el, 'click', function() {
    let result

    if (action) {
      result = action.call(dialog)
    }

    if (result !== false) {
      dialog.remove()
    }
  })
  container.appendChild(el)
  return container
}

function registerDialog(dialog) {
  const _env$dialogPolyfill = env.dialogPolyfill
  const dialogPolyfill =
    _env$dialogPolyfill === void 0 ? {} : _env$dialogPolyfill
  const {registerDialog} = dialogPolyfill

  if (registerDialog) {
    return registerDialog(dialog)
  }

  return dialog
}

const Dialog =
  /* #__PURE__ */
  (function() {
    function Dialog(options, open) {
      _classCallCheck(this, Dialog)

      const dialog = this
      options = parseOptions(options)
      const hasTitle = !(
        options.title === null ||
        options.title === false ||
        typeof options.title === 'undefined'
      )
      const hasContent = options.content
      const hasMessage = 'message' in options
      const actions = (options.actions || []).map(parseAction)
      const _options = options
      const _options$closeButton = _options.closeButton
      const closeButtonText =
        _options$closeButton === void 0 ? '' : _options$closeButton
      const {onClose} = _options
      const _options2 = options
      const {preventCancel} = _options2
      const {onCancel} = _options2
      const container = createElement('dialog', CONTAINER)
      registerDialog(container)

      if (preventCancel) {
        preventEvent(container, 'cancel')
      } else {
        addListener(container, 'cancel', function() {
          if (onCancel) {
            onCancel()
          }

          dialog.remove()
        })
      }

      this.container = container

      if (closeButtonText) {
        const closeButton = createElement(container, 'button', {
          className: CLOSE_BTN,
          innerHTML: '<span>'.concat(String(closeButtonText), '</span>')
        })
        addListener(closeButton, 'click', function() {
          if (onClose) {
            onClose()
          }

          dialog.remove()
        })
      } // head

      if (hasTitle) {
        const head = createElement(container, 'div', HEAD)
        this.head = head
        const title = createElement(head, 'div', {
          className: TITLE,
          textContent: String(options.title)
        })
      } // body

      if (hasContent || hasMessage) {
        const body = createElement(container, 'div', BODY)
        this.body = body

        if (hasContent) {
          appendElement(body, options.content)
        } else if (hasMessage) {
          const message = createElement(body, 'div', MESSAGE)
          const messageBody = createElement(message, 'span', {
            className: MESSAGE_BODY,
            textContent: String(options.message)
          })
        }
      } // foot

      if (actions.length) {
        const foot = createElement(container, 'div', FOOT)
        this.foot = foot
        const actionsContainer = createElement(foot, 'div', ACTIONS)
        forEach$1.call(actions, function(action) {
          return renderAction(actionsContainer, action, dialog)
        })
      }

      document.body.appendChild(this.container)

      if (open !== false) {
        this.open()
      }
    }

    _createClass(Dialog, [
      {
        key: 'open',
        value: function open() {
          this.container.showModal()
        }
      },
      {
        key: 'remove',
        value: function remove() {
          this.container.parentNode.removeChild(this.container)
        }
      },
      {
        key: 'close',
        value: function close() {
          this.container.close()
        }
      }
    ])

    return Dialog
  })()

function shortcutWrapper(method) {
  return function shortcutWrapper(options) {
    const onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    const {Promise} = env
    let dialog

    if (Promise) {
      const promise = new Promise(function(resolve) {
        dialog = method(options, function(result) {
          resolve(result)
          return onAction.call(this, result)
        })
      })
      promise.dialog = dialog
      return promise
    }

    return method(options, onAction)
  }
}

function addClassByClassList(el, className) {
  el.classList.add(className)
  return el
}

function addClassByClassName(el, className) {
  el.className += ' '.concat(className)
  return el
}

const addClass = SUPPORTS_CLASS_LIST ? addClassByClassList : addClassByClassName

function alert(options) {
  const onAction =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
  options = parseOptions(options)

  if (!options.actions) {
    const confirmBtn = createConfirmAction(onAction)
    options.actions = [confirmBtn]
  }

  options.onClose = onAction
  const dialog = new Dialog(options)
  addClass(dialog.container, DIALOG_TYPE_ALERT)
  return dialog
}

function confirm(options) {
  const onAction =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
  options = parseOptions(options)

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
  addClass(dialog.container, DIALOG_TYPE_CONFIRM)
  return dialog
}

function prompt(options) {
  const onAction =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
  options = parseOptions(options, {
    title: null,
    closeButton: false
  })

  if (!options.content && !('message' in options)) {
    options.content = []
  }

  const _options = options
  let {input} = _options

  if (!input) {
    if (options.rows) {
      input = createElement('textarea', {
        className: INPUT,
        rows: options.rows,
        placeholder: options.placeholder || defaults.promptPlaceholder
      })
    } else {
      input = createElement('input', {
        className: INPUT,
        placeholder: options.placeholder || defaults.promptPlaceholder
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
  addClass(dialog.container, DIALOG_TYPE_PROMPT)
  appendElement(dialog.body, input)
  dialog.open()
  return dialog
}

function exportModule() {
  function dialog(options) {
    return new Dialog(options)
  }

  assign$1(dialog, {
    env,
    setEnvironment,
    defaults,
    setDefaults,
    dialog,
    Dialog,
    alert: shortcutWrapper(alert),
    confirm: shortcutWrapper(confirm),
    prompt: shortcutWrapper(prompt),
    action: assign$1(createAction, {
      confirm: createConfirmAction,
      cancel: createCancelAction
    }),
    btn: {
      confirm: createConfirmAction(),
      cancel: createCancelAction()
    }
  })
  return dialog
}

const {Promise} = globalThis
const {dialogPolyfill} = globalThis
assign$1(env, {
  Promise,
  dialogPolyfill
})
const pureVersion = exportModule()

export default pureVersion
// # sourceMappingURL=dialog.esm.mjs.map
