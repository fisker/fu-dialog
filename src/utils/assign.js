import forEach from './for-each.js'
import forIn from './for-in.js'

const {assign} = Object

export default assign ||
  function assign(target, ...sources) {
    forEach.call(sources, function (source) {
      forIn.call(source, function (value, key) {
        target[key] = value
      })
    })

    return target
  }
