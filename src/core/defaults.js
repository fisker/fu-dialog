import assign from '../utils/assign.js'

const defaults = {
  title: '提示',
  confirmActionText: '确定',
  cancelActionText: '取消',
  promptPlaceholder: '请输入',
  reverseActions: false,
  closeButton: '关闭',
  preventCancel: true,
}

function setDefaults(options, value) {
  if (arguments.length === 2) {
    options = {
      [options]: value,
    }
  }

  return assign(defaults, options)
}

export {setDefaults}

export default defaults
