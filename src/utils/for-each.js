const {forEach} = Array.prototype

export default forEach ||
  function forEach(iteratee) {
    let index = 0
    const {length} = this
    for (; index < length; index += 1) {
      iteratee.call(this, this[index], index, this)
    }
  }
