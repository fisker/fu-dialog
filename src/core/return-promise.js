import noop from '../utils/noop'
import env from './env'

function returnPromise(method) {
  const {Promise} = env

  return function(options, onAction = noop) {
    let dialog

    const promise = new Promise(resolve => {
      dialog = method(options, function(result) {
        resolve(result)
        return onAction.call(this, result)
      })
    })
    promise.dialog = dialog

    return promise
  }
}

export default returnPromise
