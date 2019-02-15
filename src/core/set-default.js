import assign from '../utils/assign'
import defaultSettings from './default-settings'

function setDefault(options, value) {
  if (arguments.length === 2) {
    options = {
      [options]: value,
    }
  }

  return assign(defaultSettings, options)
}

export default setDefault
