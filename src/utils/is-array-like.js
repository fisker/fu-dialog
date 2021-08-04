import isLength from './is-length.js'

function isArrayLike(x) {
  return x && typeof x !== 'function' && isLength(x.length)
}

export default isArrayLike
