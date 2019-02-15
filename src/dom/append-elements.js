import isArrayLike from '../utils/is-array-like'
import forEach from '../utils/for-each'
import isNode from '../utils/is-node'

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
    forEach.call(children, function(child) {
      appendElement(parent, child)
    })

    return parent
  }

  return parent
}

export default appendElement
