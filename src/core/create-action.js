import assign from '../utils/assign'
import noop from '../utils/noop'
import returnFalse from '../utils/return-false'
import returnTrue from '../utils/return-true'
import parseClassNames from '../dom/parse-classnames'
import createElement from '../dom/create-element'
import * as classNames from './classnames'
import defaults from './defaults'

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
