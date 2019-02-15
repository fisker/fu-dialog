import defaultSettings from './default-settings'
import getType from '../utils/get-type'
import assign from '../utils/assign'

function parseOptions(
  options,
  defaultOptions = {
    title: defaultSettings.title,
  }
) {
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
