// import {
//   SUPPORTS_EVENT_LISTENER
// } from './supports'

function addListener(el, type, listener, options = false) {
  if (typeof type === 'function') {
    options = listener || false
    listener = type
    type = 'click'
  }

  el.addEventListener(type, listener, options)
  return el
}

export default addListener
