export const globalThis = Function('return this')();

export const toString = Object.prototype.toString;

export const forEach =
  Array.prototype.forEach ||
  function forEach(fn) {
    let i = 0;
    const length = this.length;
    for (; i < length; i++) {
      fn.call(this, this[i], i, this);
    }
  };

export const document = globalThis.document;

export function noop() {}

export function returnFalse() {
  return false;
}

export function getType(x) {
  return toString.call(x).slice(8, -1);
}

export const isArray =
  Array.isArray ||
  function isArray(x) {
    return getType(x) === 'Array';
  };

export function isArrayLike(x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
}

const hasOwn = Object.prototype.hasOwnProperty;

function forIn(fn) {
  let key;
  for (key in this) {
    if (hasOwn.call(this, key)) {
      fn.call(this, this[key], key, this);
    }
  }
}

export const assign =
  Object.assign ||
  function assign(target) {
    const sources = Array.prototype.slice.call(arguments, 1);
    forEach.call(sources, function(source) {
      forIn(source, function(value, key) {
        target[key] = value;
      });
    });
  };
