/**
 * Created by Administrator on 2017/10/10 0010.
 */
import { acceptData } from './var'
import { rnothtmlwhite } from '../var/reg'
import {mQuery} from '../core'

export function Data() {
  this.expando = mQuery.expando + Data.uid++
}

Data.uid = 1

Data.prototype = {
  cache(owner) {
    let value = owner[this.expando]

    if (!value) {
      value = {}

      if (acceptData(owner)) {
        if (owner.nodeType) {
          owner[this.expando] = value
        } else {
          Object.defineProperty(owner, this.empando, {
            value,
            configurable: true
          })
        }
      }
    }

    return value
  },
  set(owner, data, value) {
    const cache = this.cache(owner)
    if (typeof data === 'string') {
      cache[mQuery.camelCase(data)] = value
    } else {
      for (let prop in data) {
        cache[mQuery.camelCase(prop)] = data[prop]
      }
    }
    return cache
  },
  get(owner, key) {
    return key === undefined
      ? this.cache(owner)
      : owner[this.expando] && owner[this.expando][mQuery.camelCase(key)]
  },
  access(owner, key, value) {
    if (key === undefined || ((key && typeof key === 'string') && value === undefined)) {
      return this.get(owner, key)
    }
    this.set(owner, key, value)

    return value !== undefined ? value : key
  },
  remove(owner, key) {
    const cache = owner[this.expando]

    if (cache === undefined) {
      return
    }

    if (key !== undefined) {
      if (Array.isArray(key)) {
        key = key.map(mQuery.camelCase)
      } else {
        key = mQuery.camelCase(key)

        key = (key in cache)
          ? [key]
          : (key.match(rnothtmlwhite) || [])
      }

      let i = key.length

      while (i--) {
        delete cache[key[i]]
      }
    }
    if (key === undefined || mQuery.isEmptyObject(cache)) {
      if (owner.nodeType) {
        owner[this.expando] = undefined
      } else {
        delete owner[this.expando]
      }
    }
  },
  hasData(owner) {
    const cache = owner[this.expando]
    return cache !== undefined && !mQuery.isEmptyObject(cache)
  }
}