import {SUPPORTS_CLASS_LIST} from './supports'

function addClassByClassList(el, className) {
  el.classList.add(className)
  return el
}

function addClassByClassName(el, className) {
  el.className += ` ${className}`
  return el
}

export default (SUPPORTS_CLASS_LIST ? addClassByClassList : addClassByClassName)
