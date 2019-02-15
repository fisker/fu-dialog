import getType from './get-type'

const {isArray} = Array

export default isArray ||
  function isArray(x) {
    return getType(x) === 'Array'
  }
