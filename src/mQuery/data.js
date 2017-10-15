import { dataPriv, dataUser } from './data/var'
import { access } from './core/access'
export default function (mQuery) {
  const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
  const rmultiDash = /[A-Z]/g

  function getData(data) {
    if (data === 'true') {
      return true
    }

    if (data === 'false') {
      return false
    }

    if (data === 'null') {
      return null
    }

    if (data === +data + '') {
      return +data
    }

    if (rbrace.test(data)) {
      return JSON.parse(data)
    }

    return data
  }

  function dataAttr(elem, key, data) {
    let name
    if (data === undefined && elem.nodeType === 1) {
      name = 'data-' + key.replace(rmultiDash, '-$&').toLowerCase()
      data = elem.getAttribute(name)

      if (typeof data === 'string') {
        try {
          data = getData(data)
        } catch (e) { }
        dataUser.set(elem, key, data)
      } else {
        data = undefined
      }
    }
    return true
  }

  mQuery.extend({
    hasData(elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem)
    },
    data(elem, name, data) {
      return dataUser.access(elem, name, data)
    },
    removeData(elem, name) {
      dataUser.remove(elem, name)
    },
    _data(elem, name, data) {
      return dataPriv.access(elem, name, data)
    },
    _removeData(elem, name) {
      dataPriv.remove(elem, name)
    }
  })

  mQuery.fn.extend({
    data(key, value) {
      let data, i, name
      const elem = this[0]
      const attrs = elem && elem.attributes

      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem)
          if (elem.nodeType === 1 && !dataPriv.get(elem, 'hasDataAttrs')) {
            i = attrs.length
            while (i--) {
              if (attrs[i]) {
                name = attrs[i].name
                if (name.indexOf('data-') === 0) {
                  name = mQuery.camelCase(name.slice(5))
                  dataAttr(elem, name, data[name])
                }
              }
            }
            dataPriv.set(elem, 'hasDataAttrs', true)
          }
        }
        return data
      }

      if (typeof key === 'object') {
        return this.each(function (value) {
          dataUser.set(this, key)
        })
      }

      return access(this, function (value) {
        if (elem && value === undefined) {
          return data
        }

        data = dataUser.get(elem, key)
        if (data !== undefined) {
          return data
        }

        data = dataAttr(elem, key)
        if (data !== undefined) {
          return data
        }
      })
    },
    removeData(key) {
      return this.each(function() {
        dataUser.remove(this.key)
      })
    }
  })
}