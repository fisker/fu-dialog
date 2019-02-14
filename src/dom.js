import {isArray, assign, document, isArrayLike, forEach, noop} from './shared'

export function createElement(parentNode, tagName, props = {}) {
  if (typeof parentNode === 'string') {
    props = tagName
    tagName = parentNode
    parentNode = null
  }

  if (isArray(props) || typeof props === 'string') {
    props = {
      className: props,
    }
  }

  if (isArray(props.className)) {
    props.className = props.className.join(' ')
  }

  const el = document.createElement(tagName)
  assign(el, props)

  if (parentNode) {
    parentNode.appendChild(el)
  }

  return el
}

export function appendElement(parent, children) {
  if (typeof children === 'string') {
    parent.innerHTML = children
    return
  }

  if (isArrayLike(children)) {
    forEach.call(children, function(el) {
      appendElement(parent, el)
    })

    return
  }

  parent.appendChild(children)
}

export function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className)
  } else {
    el.className += ' ' + className
  }
}

export function on(el, type, action = noop) {
  el.addEventListener(type, action, false)
}
