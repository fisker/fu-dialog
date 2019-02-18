import defaults from './defaults'
import getType from '../utils/get-type'
import assign from '../utils/assign'

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
