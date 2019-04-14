import {SUPPORTS_CLASS_LIST} from './supports'

function addClassByClassList(element, className) {
  element.classList.add(className)
  return element
}

function addClassByClassName(element, className) {
  element.className += ` ${className}`
  return element
}

export default (SUPPORTS_CLASS_LIST ? addClassByClassList : addClassByClassName)
