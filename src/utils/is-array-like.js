import isLength from './is-length'

function isArrayLike(x) {
  return x && typeof x !== 'function' && isLength(x.length)
}

export default isArrayLike
