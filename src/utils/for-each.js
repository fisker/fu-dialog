const {forEach} = Array.prototype

export default forEach ||
  function forEach(iteratee) {
    let i = 0
    const {length} = this
    for (; i < length; i += 1) {
      iteratee.call(this, this[i], i, this)
    }
  }
