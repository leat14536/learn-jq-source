/**
 * Created by Administrator on 2017/10/7 0007.
 */
import {
  class2type,
  toString,
  getPrototypeOf,
  hasOwnProperty,
  fnToString,
  ObjectFunctionString
} from './var/obj'
import {
  push,
  sort,
  splice,
  indexOf,
  slice
} from './var/arr'
import {isWindow} from './var/util'
import {DOMEval} from './core/DOMEval'

const version = '@VERSION'
const rmsPrefix = /^-ms-/
const rdashAlpha = /-([a-z])/g
const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

const fcamelCase = function (all, letter) {
  return letter.toUpperCase()
}

export const mQuery = function (selector, context) {
  /* eslint-disable new-cap */
  return new mQuery.fn.init(selector, context)
}

mQuery.fn = mQuery.prototype = {
  constructor: mQuery,
  length: 0,
  toArray() {
    return slice.call(this)
  },
  get(num) {
    if (num == null) {
      return slice.call(this)
    }

    return num < 0 ? this[num + this.length] : this[num]
  },
  pushStack(elems) {
    const ret = mQuery.merge(this.constructor(), elems)
    ret.prevObject = this
    return ret
  },
  each(callback) {
    return mQuery.each(this, callback)
  },
  map(callback) {
    return this.pushStack(mQuery.map(this, (elem, i) => {
      return callback.call(elem, i, elem)
    }))
  },
  slice() {
    return this.pushStack(slice.apply(this, arguments))
  },
  first() {
    return this.eq(0)
  },
  last() {
    return this.eq(-1)
  },
  eq(i) {
    const len = this.length
    const j = +i + (i < 0 ? len : 0)
    return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
  },
  end() {
    return this.prevObject || this.constructor()
  },
  push,
  sort,
  splice
}

mQuery.extend = mQuery.fn.extend = function () {
  let options, name, src, copy, copyIsArray, clone
  let target = arguments[0] || {}
  let deep = false
  let i = 1
  const length = arguments.length

  // 处理deep
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }

  // 可能是容错处理
  if (typeof target !== 'object' && !mQuery.isFunction(target)) target = {}

  // jq插件扩展
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) !== null || options !== undefined) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止死循环
        if (target === copy) continue
        if (deep && copy && (mQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            // target[name]本身是数组的话则拼接
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && mQuery.isPlainObject(src) ? src : {}
          }
          // 递归拷贝
          target[name] = mQuery.extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

function method() {
  console.log('jq method')
}

mQuery.extend({
  // 保证每个实例都不一样
  expando: `mQuery${(version + Math.random()).replace(/\D/g, '')}`,
  isReady: true,
  error(msg) {
    throw new Error(msg)
  },
  noop() {
  },
  isFunction(obj) {
    // 低版本浏览器typeof dom节点可能出错
    // (i.e., `typeof document.createElement( "object" ) === "function"`)
    return obj === 'function' && typeof obj.nodeType !== 'number'
  },
  isNumeric(obj) {
    const type = mQuery.type(obj)
    return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj))
  },
  isPlainObject(obj) {
    // 判断obj值 是不是一个object 且 不是实例
    if (!obj || toString.call(obj) !== '[object Object]') return false

    const proto = getPrototypeOf(obj)
    if (!proto) return true

    const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
  },
  isEmptyObject(obj) {
    /* eslint-disable no-unused-vars */
    for (let name in obj) {
      return false
    }
    return true
  },
  type(obj) {
    if (obj === null || obj === undefined) {
      return obj + ''
    }

    return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj
  },
  globalEval(code) {
    DOMEval(code)
  },
  camelCase(string) {
    // 转驼峰
    return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase())
  },
  each(obj, callback) {
    let i = 0
    if (isArrayLike(obj)) {
      const length = obj.length
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) break
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) break
      }
    }
  },
  trim(text) {
    return text == null ? '' : (text + '').replace(rtrim, '')
  },
  makeArray(arr, results) {
    const ret = results || []

    if (arr != null) {
      if (isArrayLike(Object(arr))) {
        mQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
      }
    } else {
      push.call(ret, arr)
    }
    return ret
  },
  inArray(elem, arr, i) {
    return arr == null ? -1 : indexOf.call(arr, elem, i)
  },
  merge(first, second) {
    const len = +second.length
    let j = 0
    let i = first.length

    for (; j < len; j++) {
      first[i++] = second[j]
    }
    return first
  },
  grep(elems, callback, invert) {
    // 筛选数组的方法 类似filter 第三个值可以作为筛选的返回值
    const length = elems.length
    const callbackExpect = !invert
    const matches = []
    let callbackInverse
    for (let i = 0; i < length; i++) {
      callbackInverse = !callback(elems[i], i)
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i])
      }
    }
    return matches
  },
  map(elems, callback, arg) {
    const ret = []
    let length, i, value
    if (isArrayLike(elems)) {
      length = elems.length
      for (i = 0; i < length; i++) {
        value = callback(elems[i], i, arg)
        if (value != null) {
          ret.push(value)
        }
      }
    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg)
        if (value != null) {
          ret.push(value)
        }
      }
    }
  },
  guid: 1,
  proxy(fn, context) {
    let tmp
    // 第一个参数是对象第二个参数是str的话, 将fn[context](type: fn)的this指向fn
    if (typeof context === 'string') {
      tmp = fn[context]
      context = fn
      fn = tmp
    }

    if (!mQuery.isFunction(fn)) {
      return undefined
    }

    const args = slice.call(arguments, 2)
    const proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)))
    }
    proxy.guid = fn.guid = fn.guid || mQuery.guid++

    return proxy
  },
  now: Date.now,
  support: method
})

mQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
  function (i, name) {
    class2type[`[object ${name}]`] = name.toLowerCase()
  })

function isArrayLike(obj) {
  const length = !!obj && 'length' in obj && obj.length
  const type = mQuery.type(obj)
  if (mQuery.isFunction(obj) || isWindow(obj)) return false
  /* eslint-disable no-mixed-operators */
  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj
}
