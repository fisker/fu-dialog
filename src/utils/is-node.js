function isNode(x) {
  return x && typeof x.nodeType === 'number'
}

export default isNode
