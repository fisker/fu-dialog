function one(function_) {
  let called = false
  return function (...arguments_) {
    if (called) {
      return null
    }

    called = true

    return function_.apply(this, arguments_)
  }
}

export default one
