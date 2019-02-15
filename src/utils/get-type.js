import toString from './to-string'

function getType(x) {
  return toString.call(x).slice(8, -1)
}

export default getType
