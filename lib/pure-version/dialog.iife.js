/*!
 * fu-dialog v1.0.5
 * https://github.com/fisker/fu-dialog#readme
 *
 * Copyright 2019 fisker
 * Released under the MIT license
 *
 * Date: 2019-02-17T13:45:35.587Z
 */

var fd = (function() {
  'use strict'

  var env = {}

  // eslint-disable-next-line no-new-func
  var globalThis = Function('return this')()

  var forEach = Array.prototype.forEach
  var forEach$1 =
    forEach ||
    function forEach(iteratee) {
      var i = 0
      var length = this.length

      for (; i < length; i++) {
        iteratee.call(this, this[i], i, this)
      }
    }

  var hasOwnProperty = Object.prototype.hasOwnProperty

  function forIn(iteratee) {
    var key

    for (key in this) {
      if (hasOwnProperty.call(this, key)) {
        iteratee.call(this, this[key], key, this)
      }
    }
  }

  var assign = Object.assign
  var assign$1 =
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
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      })
    } else {
      obj[key] = value
    }

    return obj
  }

  var name = 'fu-dialog'

  var document = globalThis.document

  if (!document) {
    throw new Error(''.concat(name, ' requires a window with a document.'))
  }

  var NS = 'fu-dialog'
  var CONTAINER = NS
  var HEAD = ''.concat(NS, '__head')
  var TITLE = ''.concat(NS, '__title')
  var BODY = ''.concat(NS, '__body')
  var MESSAGE = ''.concat(NS, '__message')
  var MESSAGE_BODY = ''.concat(NS, '__message-body')
  var INPUT = ''.concat(NS, '__input')
  var FOOT = ''.concat(NS, '__foot')
  var ACTIONS = ''.concat(NS, '__actions')
  var CLOSE_BTN = ''.concat(NS, '__close')
  var ACTION = ''.concat(NS, '__action')
  var ACTION_TYPE_CONFIRM = ''.concat(ACTION, '--confirm')
  var ACTION_TYPE_CANCEL = ''.concat(ACTION, '--cancel')
  var DIALOG_TYPE_ALERT = ''.concat(NS, '--alert')
  var DIALOG_TYPE_CONFIRM = ''.concat(NS, '--confirm')
  var DIALOG_TYPE_PROMPT = ''.concat(NS, '--prompt')

  var toString = Object.prototype.toString

  function getType(x) {
    return toString.call(x).slice(8, -1)
  }

  var isArray = Array.isArray
  var isArray$1 =
    isArray ||
    function isArray(x) {
      return getType(x) === 'Array'
    }

  var div = document.createElement('div')
  var SUPPORTS_CLASS_LIST = 'classList' in div
  var SUPPORTS_TEXT_CONTENT = 'textContent' in div

  function parseClassNames() {
    var className =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
    var classList = ''

    if (isArray$1(className)) {
      classList = className
    } else {
      classList = String(className || '').split(' ')
    }

    return classList
  }

  function parseDomProps() {
    var props =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

    if (isArray$1(props) || typeof props === 'string') {
      props = {
        className: props
      }
    }

    var classList = parseClassNames(props.className)

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

  var defaultDomProps = {
    button: {
      type: 'button'
    },
    input: {
      type: 'text'
    }
  }

  function setDefaultProps(props, tagName) {
    var defaultProps = defaultDomProps[tagName]

    if (defaultProps) {
      props = assign$1({}, defaultProps, props)
    }

    return props
  }

  function createElement(parentNode, tagName) {
    var props =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

    if (typeof parentNode === 'string') {
      props = tagName
      tagName = parentNode
      parentNode = null
    }

    var el = document.createElement(tagName)
    props = parseDomProps(props)
    props = setDefaultProps(props, tagName)
    assign$1(el, props)

    if (parentNode) {
      parentNode.appendChild(el)
    }

    return el
  }

  var MAX_SAFE_INTEGER = 9007199254740991

  function isLength(x) {
    return (
      typeof x === 'number' && x > -1 && x % 1 === 0 && x <= MAX_SAFE_INTEGER
    )
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

  var returnFalse = function() {
    return false
  }

  var returnTrue = function() {
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
    var options =
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

  var defaultSettings = {
    title: '提示',
    confirmActionText: '确定',
    cancelActionText: '取消',
    promptPlaceholder: '请输入',
    reverseActions: false,
    closeButton: '关闭',
    preventCancel: true
  }

  function parseOptions(options) {
    var defaultOptions =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : defaultSettings
    var type = getType(options)

    if (type !== 'Object') {
      options = {
        message: options
      }
    }

    options = assign$1(defaultOptions, options)
    return options
  }

  var noop = function() {}

  function createAction(actionText, props) {
    var action =
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
    var classList = parseClassNames(props.className)
    classList.unshift(ACTION)
    props.className = classList
    var el = createElement('button', props)
    return {
      el: el,
      action: action
    }
  }

  function createTypedAction(type) {
    var typedActionClassName = ''

    if (type === 'confirm') {
      typedActionClassName = ACTION_TYPE_CONFIRM
    } else if (type === 'cancel') {
      typedActionClassName = ACTION_TYPE_CANCEL
    }

    return function(actionText, action) {
      var DEFAULT_TEXT = defaultSettings[''.concat(type, 'ActionText')]

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

  var createConfirmAction = createTypedAction('confirm')
  var createCancelAction = createTypedAction('cancel')

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

    if (typeof action === 'function' || typeof action === 'boolean') {
      action = createConfirmAction(action)
    }

    if (!action.el) {
      action = createAction(action.text, action.action)
    }

    return action
  }

  function renderAction(container, btn, dialog) {
    var el = btn.el,
      action = btn.action
    addListener(el, 'click', function() {
      var result

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
    var _env$dialogPolyfill = env.dialogPolyfill,
      dialogPolyfill = _env$dialogPolyfill === void 0 ? {} : _env$dialogPolyfill
    var registerDialog = dialogPolyfill.registerDialog

    if (registerDialog) {
      return registerDialog(dialog)
    }

    return dialog
  }

  var Dialog =
    /*#__PURE__*/
    (function() {
      function Dialog(options, open) {
        _classCallCheck(this, Dialog)

        var dialog = this
        options = parseOptions(options)
        var hasTitle = !(
          options.title === null ||
          options.title === false ||
          typeof options.title === 'undefined'
        )
        var hasContent = options.content
        var hasMessage = 'message' in options
        var actions = (options.actions || []).map(parseAction)
        var _options = options,
          _options$closeButton = _options.closeButton,
          closeButtonText =
            _options$closeButton === void 0 ? '' : _options$closeButton,
          onClose = _options.onClose
        var _options2 = options,
          preventCancel = _options2.preventCancel,
          onCancel = _options2.onCancel
        var container = createElement('dialog', CONTAINER)
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
          var closeButton = createElement(container, 'button', {
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
          var head = createElement(container, 'div', HEAD)
          this.head = head
          var title = createElement(head, 'div', {
            className: TITLE,
            textContent: String(options.title)
          })
        } // body

        if (hasContent || hasMessage) {
          var body = createElement(container, 'div', BODY)
          this.body = body

          if (hasContent) {
            appendElement(body, options.content)
          } else if (hasMessage) {
            var message = createElement(body, 'div', MESSAGE)
            var messageBody = createElement(message, 'span', {
              className: MESSAGE_BODY,
              textContent: String(options.message)
            })
          }
        } // foot

        if (actions.length) {
          var foot = createElement(container, 'div', FOOT)
          this.foot = foot
          var actionsContainer = createElement(foot, 'div', ACTIONS)
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

  function returnPromise(method) {
    var Promise = env.Promise
    return function(options) {
      var onAction =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
      var dialog
      var promise = new Promise(function(resolve) {
        dialog = method(options, function(result) {
          resolve(result)
          return onAction.call(this, result)
        })
      })
      promise.dialog = dialog
      return promise
    }
  }

  var identify = function(x) {
    return x
  }

  function setDefault(options, value) {
    if (arguments.length === 2) {
      options = _defineProperty({}, options, value)
    }

    return assign$1(defaultSettings, options)
  }

  function addClassByClassList(el, className) {
    el.classList.add(className)
    return el
  }

  function addClassByClassName(el, className) {
    el.className += ' '.concat(className)
    return el
  }

  var addClass = SUPPORTS_CLASS_LIST ? addClassByClassList : addClassByClassName

  function alert(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options)

    if (!options.actions) {
      var confirmBtn = createConfirmAction(onAction)
      options.actions = [confirmBtn]
    }

    options.onClose = onAction
    var dialog = new Dialog(options)
    addClass(dialog.container, DIALOG_TYPE_ALERT)
    return dialog
  }
  function confirm(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options)

    function onConfirm() {
      return onAction.call(this, true)
    }

    function onCancel() {
      return onAction.call(this, false)
    }

    if (!options.actions) {
      var confirmBtn = createConfirmAction(onConfirm)
      var cancelBtn = createCancelAction(onCancel)

      if (defaultSettings.reverseActions) {
        options.actions = [cancelBtn, confirmBtn]
      } else {
        options.actions = [confirmBtn, cancelBtn]
      }
    }

    options.onClose = onCancel
    var dialog = new Dialog(options)
    addClass(dialog.container, DIALOG_TYPE_CONFIRM)
    return dialog
  }
  function prompt(options) {
    var onAction =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop
    options = parseOptions(options, {
      title: null,
      closeButton: false
    })

    if (!options.content && !('message' in options)) {
      options.content = []
    }

    var _options = options,
      input = _options.input

    if (!input) {
      if (options.rows) {
        input = createElement('textarea', {
          className: INPUT,
          rows: options.rows,
          placeholder: options.placeholder || defaultSettings.promptPlaceholder
        })
      } else {
        input = createElement('input', {
          className: INPUT,
          placeholder: options.placeholder || defaultSettings.promptPlaceholder
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
      var confirmBtn = createConfirmAction(onConfirm)
      var cancelBtn = createCancelAction(onCancel)

      if (defaultSettings.reverseActions) {
        options.actions = [cancelBtn, confirmBtn]
      } else {
        options.actions = [confirmBtn, cancelBtn]
      }
    }

    options.onClose = onCancel
    var dialog = new Dialog(options, false)
    addClass(dialog.container, DIALOG_TYPE_PROMPT)
    appendElement(dialog.body, input)
    dialog.open()
    return dialog
  }

  function exportModule() {
    var shortCutWrapper = env.Promise ? returnPromise : identify

    function dialog(options) {
      return new Dialog(options)
    }

    assign$1(dialog, {
      defaultSettings: defaultSettings,
      setDefault: setDefault,
      dialog: dialog,
      Dialog: Dialog,
      alert: shortCutWrapper(alert),
      confirm: shortCutWrapper(confirm),
      prompt: shortCutWrapper(prompt),
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

  var Promise$1 = globalThis.Promise,
    dialogPolyfill = globalThis.dialogPolyfill
  assign$1(env, {
    Promise: Promise$1,
    dialogPolyfill: dialogPolyfill
  })
  var pureVersion = exportModule()

  return pureVersion
})()
//# sourceMappingURL=dialog.iife.js.map
