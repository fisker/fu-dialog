// eslint-disable-next-line unicorn/numeric-separators-style
const MAX_SAFE_INTEGER = 9007199254740991

function isLength(x) {
  return typeof x === 'number' && x > -1 && x % 1 === 0 && x <= MAX_SAFE_INTEGER
}

export default isLength
