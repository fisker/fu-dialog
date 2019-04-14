// import {
//   SUPPORTS_EVENT_LISTENER
// } from './supports'

import returnFalse from '../utils/return-false'
import returnTrue from '../utils/return-true'

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

function addListener(element, type, listener, options = false) {
  if (isListener(type)) {
    options = listener || false
    listener = type
    type = 'click'
  }

  listener = parseListener(listener)

  element.addEventListener(type, listener, options)
  return element
}

export default addListener
