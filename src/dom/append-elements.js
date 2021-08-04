import isArrayLike from '../utils/is-array-like.js'
import forEach from '../utils/for-each.js'
import isNode from '../utils/is-node.js'

function appendElement(parent, children) {
  if (typeof children === 'string') {
    parent.innerHTML = children
    return parent
  }

  if (isNode(children)) {
    parent.appendChild(children)
    return parent
  }

  if (isArrayLike(children)) {
    forEach.call(children, function (child) {
      appendElement(parent, child)
    })

    return parent
  }

  return parent
}

export default appendElement
