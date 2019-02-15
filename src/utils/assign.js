import forEach from './for-each'
import forIn from './for-in'

const {assign} = Object

export default assign ||
  function assign(target, ...sources) {
    forEach.call(sources, function(source) {
      forIn.call(source, function(value, key) {
        target[key] = value
      })
    })

    return target
  }
