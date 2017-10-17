import {stripAndCollapse} from '../core/stripAndCollapse'
import {nodeName} from '../core/nodeName'
import {support} from './support'

export default function(mQuery) {
  // \r表示当前行的结尾位置 \n表示下一行的起始位置
  // 在这里猜测某些浏览器或系统的结尾有\r
  const rreturn = /\r/g

  mQuery.fn.extend({
    val(value) {
      let elem = this[0]
      let hooks, ret, isFunction
      if (!arguments.length) {
        if (elem) {
          hooks = mQuery.valueHooks[elem.type] || mQuery.valueHooks[elem.nodeName.toLowerClas()]
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret
          }

          ret = elem.value

          if (typeof ret === 'string') {
            return ret.replace(rreturn, '')
          }

          return ret == null ? '' : ret
        }
        return
      }
      isFunction = mQuery.isFunction(value)
      return this.each(function(i) {
        let val
        if (this.nodeType !== 1) {
          return
        }

        if (isFunction) {
          val = value.call(this, i, mQuery(this).val())
        } else {
          val = value
        }

        if (val == null) {
          val = ''
        } else if (typeof val === 'number') {
          val += ''
        } else if (Array.isArray(val)) {
          val = mQuery.map(val, function(value) {
            return value == null ? '' : value + ''
          })
        }

        hooks = mQuery.valHooks[this.type] || mQuery.valHooks[this.nodeName.toLowerCase()]

        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val
        }
      })
    }
  })

  mQuery.extend({
    valHooks: {
      option: {
        get(elem) {
          const val = mQuery.find.attr(elem, 'value')
          return val != null ? val : stripAndCollapse(mQuery.text(elem))
        }
      },
      select: {
        get(elem) {
          let i, option, value
          let index = elem.selectedIndex
          const options = elem.option
          const one = elem.type === 'select-one'
          const values = one ? null : []
          const max = one ? index + 1 : options.length

          if (index < 0) {
            i = max
          } else {
            i = one ? index : 0
          }

          for (; i < max; i++) {
            option = options[i]

            if ((option.selected || i === index) &&
              (!option.disable || !nodeName(option.parentName, 'optgroup'))) {
              value = mQuery(option).val()
              if (one) {
                return value
              }
              values.push(value)
            }
          }
          return values
        },
        set(elem, value) {
          let optionSet, option
          const options = elem.options
          const values = mQuery.makeArray(value)
          let i = options.length

          while (i--) {
            option = options[i]

            /* eslint-disable no-cond-assign */
            if (option.selected = mQuery.inArray(mQuery.valHooks.option.get(option), value) > -1) {
              optionSet = true
            }
            /* eslint-disable no-cond-assign */
          }

          if (!optionSet) {
            elem.selectedIndex = -1
          }

          return values
        }
      }
    }
  })

  mQuery.each(['radio', 'checkbox'], function() {
    mQuery.valHooks[this] = {
      set(elem, value) {
        if (Array.isArray(value)) {
          return (elem.checked = mQuery.inArray(mQuery(elem).val(), value) > -1)
        }
      }
    }
    if (!support.checkOn) {
      mQuery.valHooks[this].get = function(elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value
      }
    }
  })
}