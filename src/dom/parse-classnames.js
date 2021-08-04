import isArray from '../utils/is-array.js'

function parseClassNames(className = []) {
  let classList = ''

  if (isArray(className)) {
    classList = className
  } else {
    classList = String(className || '').split(' ')
  }

  return classList
}

export default parseClassNames
