import hasOwn from './has-own.js'

function forIn(iteratee) {
  let key
  for (key in this) {
    if (hasOwn.call(this, key)) {
      iteratee.call(this, this[key], key, this)
    }
  }
}

export default forIn
