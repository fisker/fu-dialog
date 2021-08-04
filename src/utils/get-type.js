import toString from './to-string.js'

function getType(x) {
  return toString.call(x).slice(8, -1)
}

export default getType
