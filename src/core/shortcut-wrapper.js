import noop from '../utils/noop.js'
import environment from './environment.js'

function shortcutWrapper(method) {
  return function shortcutWrapper(options, onAction = noop) {
    const {Promise} = environment
    let dialog

    if (Promise) {
      const promise = new Promise((resolve) => {
        dialog = method(options, function (result) {
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
