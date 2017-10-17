import {rnothtmlwhite} from '../var/reg'
import {stripAndCollapse} from '../core/stripAndCollapse'
import {dataPriv} from '../data/var'

export default function(mQuery) {
  function getClass(elem) {
    return elem.getAttribute && (elem.getAttribute('class') || '')
  }

  mQuery.fn.extend({
    addClass(value) {
      let classes, elem, curValue, cur, j, clazz, finalValue
      let i = 0
      if (mQuery.isFunction(value)) {
        return this.each(function(j) {
          return mQuery(this).addClass(value.call(this, j, getClass(this)))
        })
      }

      if (typeof value === 'string' && value) {
        classes = value.match(rnothtmlwhite) || []

        while ((elem = this[i++])) {
          curValue = getClass(elem)
          cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')

          if (cur) {
            j = 0
            while ((clazz = classes[j++])) {
              if (cur.indexOf(' ' + clazz + ' ') < 0) {
                cur += clazz + ' '
              }
            }

            finalValue = stripAndCollapse(cur)
            if (curValue !== finalValue) {
              elem.setAttribute('class', finalValue)
            }
          }
        }
      }
      return this
    },
    removeClass(value) {
      let classes, curValue, elem, j, cur, clazz, finalValue
      let i = 0
      if (mQuery.isFunction(value)) {
        return this.each(function(j) {
          mQuery(this).removeClass(value.call(this, j, getClass(this)))
        })
      }

      if (!arguments.length) {
        return this.attr('class', '')
      }

      if (typeof value === 'string' && value) {
        classes = value.match(rnothtmlwhite) || []
        while ((elem = this[i++])) {
          curValue = getClass(elem)

          cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')
          if (cur) {
            j = 0
            while ((clazz = classes[j++])) {
              while (cur.indexOf(' ' + clazz + ' ') > -1) {
                cur = cur.replace(' ' + clazz + ' ', ' ')
              }
            }

            finalValue = stripAndCollapse(cur)

            if (cur !== finalValue) {
              elem.setAttribute('class', finalValue)
            }
          }
        }
      }
      return this
    },
    toggleClass(value, stateVal) {
      const type = typeof value
      if (typeof stateValue === 'boolean' && type === 'string') {
        return stateVal ? this.addClass(value) : this.rmoveClass(value)
      }

      if (mQuery.isFunction(value)) {
        return this.each(function (i) {
          mQuery(this).toggleClass(
            value.call(this, i, getClass(this), stateVal),
            stateVal
          )
        })
      }

      return this.each(function() {
        let i, self, classNames, className
        if (type === 'string') {
          i = 0
          self = mQuery(this)
          classNames = value.match(rnothtmlwhite) || []

          while ((className = classNames[i++])) {
            if (self.hasClass(className)) {
              self.removeClass(className)
            } else {
              self.addClass(className)
            }
          }
        } else if (value === undefined || type === 'boolean') {
          className = getClass(this)
          if (className) {
            dataPriv.set(this, '__className__', className)
          }

          if (this.setAttribute) {
            this.setAttrbute('class',
              className || value === false
                ? ''
                : dataPriv.get(this, '__className__') || '')
          }
        }
      })
    },
    hasClass(selector) {
      let elem
      let i = 0
      const className = ' ' + selector + ' '

      while ((elem = this[i++])) {
        if (elem.nodeType === 1 &&
          (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1) {
          return true
        }
      }
      return false
    }
  })
}