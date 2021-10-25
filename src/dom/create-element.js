import isArray from '../utils/is-array.js'
import document from '../utils/document.js'
import assign from '../utils/assign.js'
import {SUPPORTS_TEXT_CONTENT} from './supports.js'
import parseClassNames from './parse-classnames.js'

function parseDomProperties(properties = {}) {
  if (isArray(properties) || typeof properties === 'string') {
    properties = {
      className: properties,
    }
  }

  const classList = parseClassNames(properties.className)

  if (classList.length !== 0) {
    properties.className = classList.join(' ')
  } else {
    delete properties.className
  }

  if (!SUPPORTS_TEXT_CONTENT && 'textContent' in properties) {
    properties.innerText = properties.textContent
    delete properties.textContent
  }

  return properties
}

const defaultDomProperties = {
  button: {
    type: 'button',
  },
  input: {
    type: 'text',
  },
}

function setDefaultProperties(properties, tagName) {
  const defaultProps = defaultDomProperties[tagName]

  if (defaultProps) {
    properties = assign({}, defaultProps, properties)
  }

  return properties
}

function createElement(parentNode, tagName, properties = {}) {
  if (typeof parentNode === 'string') {
    properties = tagName
    tagName = parentNode
    parentNode = undefined
  }

  const element = document.createElement(tagName)
  properties = parseDomProperties(properties)
  properties = setDefaultProperties(properties, tagName)

  assign(element, properties)

  if (parentNode) {
    parentNode.appendChild(element)
  }

  return element
}

export default createElement
