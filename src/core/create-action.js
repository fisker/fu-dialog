import assign from '../utils/assign.js'
import noop from '../utils/noop.js'
import returnFalse from '../utils/return-false.js'
import returnTrue from '../utils/return-true.js'
import parseClassNames from '../dom/parse-classnames.js'
import createElement from '../dom/create-element.js'
import * as classNames from './classnames.js'
import defaults from './defaults.js'

function createAction(actionText, properties, action = noop) {
  if (typeof properties === 'function') {
    action = properties
    properties = {}
  }

  if (action === false) {
    action = returnFalse
  }

  if (action === true) {
    action = returnTrue
  }

  properties = assign(
    {
      textContent: String(actionText),
    },
    properties
  )

  const classList = parseClassNames(properties.className)
  classList.unshift(classNames.ACTION)
  properties.className = classList

  const element = createElement('button', properties)

  return {
    el: element,
    action,
  }
}

function createTypedAction(type) {
  let typedActionClassName = ''

  if (type === 'confirm') {
    typedActionClassName = classNames.ACTION_TYPE_CONFIRM
  } else if (type === 'cancel') {
    typedActionClassName = classNames.ACTION_TYPE_CANCEL
  }

  return function (actionText, action) {
    const DEFAULT_TEXT = defaults[`${type}ActionText`]

    if (typeof actionText === 'function') {
      action = actionText
      actionText = DEFAULT_TEXT
    }

    actionText = actionText || DEFAULT_TEXT

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

export default createAction
