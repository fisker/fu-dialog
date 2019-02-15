import isArray from '../utils/is-array'
import document from '../utils/document'
import assign from '../utils/assign'
import {SUPPORTS_TEXT_CONTENT} from './supports'
import parseClassNames from './parse-classnames'

function parseDomProps(props = {}) {
  if (isArray(props) || typeof props === 'string') {
    props = {
      className: props,
    }
  }

  const classList = parseClassNames(props.className)

  if (classList.length) {
    props.className = classList.join(' ')
  } else {
    delete props.className
  }

  if (!SUPPORTS_TEXT_CONTENT && 'textContent' in props) {
    props.innerText = props.textContent
    delete props.textContent
  }

  return props
}

const defaultDomProps = {
  button: {
    type: 'button',
  },
  input: {
    type: 'text',
  },
}

function setDefaultProps(props, tagName) {
  const defaultProps = defaultDomProps[tagName]

  if (defaultProps) {
    props = assign({}, defaultProps, props)
  }

  return props
}

function createElement(parentNode, tagName, props = {}) {
  if (typeof parentNode === 'string') {
    props = tagName
    tagName = parentNode
    parentNode = null
  }

  const el = document.createElement(tagName)
  props = parseDomProps(props)
  props = setDefaultProps(props, tagName)

  assign(el, props)

  if (parentNode) {
    parentNode.appendChild(el)
  }

  return el
}

export default createElement
