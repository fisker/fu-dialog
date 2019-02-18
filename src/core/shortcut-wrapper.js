import noop from '../utils/noop'
import env from './env'

function shortcutWrapper(method) {
  return function shortcutWrapper(options, onAction = noop) {
    const {Promise} = env
    let dialog

    if (Promise) {
      const promise = new Promise(resolve => {
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

export default shortcutWrapper
