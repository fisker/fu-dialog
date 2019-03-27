function one(fn) {
  let called = false
  return function(...args) {
    if (called) {
      return null
    }

    called = true

    return fn.apply(this, args)
  }
}

export default one
