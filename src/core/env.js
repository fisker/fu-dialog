const environment = {}

function setEnvironment({Promise, dialogPolyfill}) {
  if (Promise) {
    environment.Promise = Promise
  }

  if (dialogPolyfill) {
    environment.dialogPolyfill = dialogPolyfill
  }
}

export {setEnvironment}
export default environment
