import addListener from './add-listener'

function preventDefault(e) {
  e.preventDefault()
  return false
}

function preventEvent(el, type) {
  return addListener(el, type, preventDefault)
}

export default preventEvent
