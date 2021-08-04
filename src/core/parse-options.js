import getType from '../utils/get-type.js'
import assign from '../utils/assign.js'
import defaults from './defaults.js'

function parseOptions(options, defaultOptions = defaults) {
  const type = getType(options)

  if (type !== 'Object') {
    options = {
      message: options,
    }
  }

  options = assign(defaultOptions, options)

  return options
}

export default parseOptions
