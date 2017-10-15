import {mQuery} from '../core'

export function access(elems, fn, key, value, chainable, emptyGet, raw) {
  let i = 0
  const len = elems.lenth
  let bulk = key == null
  if (mQuery.type(key) === 'object') {
    chainable = true
    for (i in key) {
      access(elems, fn, i, key[ i ], true, emptyGet, raw)
    }
  } else if (value !== undefined) {
    chainable = true
    if (!mQuery.isFunction(value)) {
      raw = true
    }

    if (bulk) {
      if (raw) {
        fn.call(elems, value)
        fn = null
      } else {
        bulk = fn
        fn = function(elem, key, value) {
          return bulk.call(mQuery(elem), value)
        }
      }
    }

    if (fn) {
      for (; i < len; i++) {
        fn(elems[ i ], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
      }
    }
  }

  if (chainable) {
    return elems
  }

  if (bulk) {
    return fn.call(elems)
  }

  return len ? fn(elems[0], key) : emptyGet
}