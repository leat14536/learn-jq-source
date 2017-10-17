import {access} from '../core/access'
import {support} from './support'
import {nodeName} from '../core/nodeName'
import {rnothtmlwhite} from '../var/reg'

export default function (mQuery) {
  let boolHook
  const attrHandle = mQuery.expr.attrHandle
  mQuery.fn.extend({
    attr(name, value) {
      return access(this, mQuery.attr, name, value, arguments.length > 1)
    },
    removeAttr(name) {
      return this.each(function() {
        mQuery.removeAttr(this, name)
      })
    }
  })

  mQuery.extend({
    attr(elem, name, value) {
      const nType = elem.nodeType
      let hooks, ret
      if (nType === 3 || nType === 8 || nType === 2) {
        return
      }

      if (typeof elem.getAttribute === 'undefined') {
        return mQuery.prop(elem, name, value)
      }

      if (nType !== 1 || !mQuery.isXMLDoc(elem)) {
        hooks = mQuery.attrHooks[name.toLowerCase()] ||
        (mQuery.expr.match.bool.test(name) ? boolHook : undefined)
      }

      if (value !== undefined) {
        if (value === null) {
          mQuery.removeAttr(elem, name)
          return
        }

        if (hooks && 'set' in hooks &&
        (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret
        }

        elem.setAttribute(name, value + '')
        return value
      }

      if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret
      }

      ret = mQuery.find.attr(elem, name)
      return ret == null ? undefined : ret
    },
    attrHooks: {
      type: {
        set(elem, value) {
          if (!support.radioValue && value === 'radio' &&
          nodeName(elem, 'input')) {
            const val = elem.value
            elem.setAttribute('type', value)
            if (val) {
              elem.value = val
            }
            return value
          }
        }
      }
    },
    removeAttr(elem, value) {
      let i = 0
      let name
      const attrNames = value && value.match(rnothtmlwhite)
      if (attrNames && elem.nodeType === 1) {
        while ((name = attrNames[i++])) {
          elem.removeAttribute(name)
        }
      }
    }
  })

  boolHook = {
    set(elem, value, name) {
      if (value === false) {
        mQuery.removeAttr(elem, name)
      } else {
        mQuery.setAttribute(name, name)
      }
      return name
    }
  }

  mQuery.each(mQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
    const getter = attrHandle[name] || mQuery.find.attr
    attrHandle[name] = function(elem, name, isXML) {
      const lowercaseName = name.toLowerCase()
      let ret, handle
      if (!isXML) {
        handle = attrHandle[lowercaseName]
        attrHandle[lowercaseName] = ret
        ret = getter(elem, name, isXML) != null ? lowercaseName : null
        attrHandle[lowercaseName] = handle
      }
      return ret
    }
  })
}