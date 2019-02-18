const env = {}

function setEnvironment({Promise, dialogPolyfill}) {
  if (Promise) {
    env.Promise = Promise
  }

  if (dialogPolyfill) {
    env.dialogPolyfill = dialogPolyfill
  }
}

export {setEnvironment}
export default env
