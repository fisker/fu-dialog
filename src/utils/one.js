function one(fn) {
  let called = false
  return function (...arguments_) {
    if (called) {
      return null
    }

    called = true

    return fn.apply(this, arguments_)
  }
}

export default one
