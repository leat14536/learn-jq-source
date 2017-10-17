
import { access } from '../core/access'
import { support } from './support'

export default function(mQuery) {
  const rfocusable = /^(?:input|select|textarea|button)$/i
  const rclickable = /^(?:a|area)$/i

  mQuery.fn.extend({
    prop(name, value) {
      return access(this, mQuery.prop, name, value, arguments.length > 1)
    },
    removeProp(name) {
      return this.each(function() {
        delete this[mQuery.propFix[name] || name]
      })
    }
  })

  mQuery.extend({
    prop(elem, name, value) {
      let ret, hooks
      const nType = elem.nodeType

      if (nType === 3 || nType === 8 || nType === 2) {
        return
      }

      if (nType !== 1 || !mQuery.isXMLDoc(elem)) {
        name = mQuery.propFix[name] || name
        hooks = mQuery.propHooks[name]
      }

      if (value !== undefined) {
        if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret
        }

        return (elem[name] = value)
      }
      return elem[name]
    },
    propHooks: {
      tabIndex: {
        get(elem) {
          const tabindex = mQuery.find.attr(elem, 'tabindex')

          if (tabindex) {
            return parseInt(tabindex, 10)
          }

          if (rfocusable.test(elem.nodeName) ||
          (rclickable.test(elem.nodeName) &&
          elem.href)) {
            return 0
          }

          return -1
        }
      }
    },
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    }
  })

  /* eslint-disable no-unused-expressions */
  if (!support.optSelected) {
    mQuery.propHooks.selected = {
      get(elem) {
        var parent = elem.parentNode
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex
        }
        return null
      },
      set(elem) {
        var parent = elem.parentNode
        if (parent) {
          parent.selectedIndex
          if (parent.parentNode) {
            parent.parentNode.selectedIndex
          }
        }
      }
    }
  }
  /* eslint-disable no-unused-expressions */

  mQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function() {
    mQuery.propFix[this.toLowerCase()] = this
  })
}