import isArrayLike from '../utils/is-array-like.js'
import isNode from '../utils/is-node.js'
import createAction, {
  createConfirmAction,
  createCancelAction,
} from './create-action.js'

function parseAction(action) {
  if (typeof action === 'string') {
    action = {
      text: action,
    }
  }

  if (isArrayLike(action)) {
    return parseAction(action[0])
  }

  if (isNode(action)) {
    action = {
      el: action,
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

export default parseAction
