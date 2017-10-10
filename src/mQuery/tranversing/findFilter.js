/**
 * Created by Administrator on 2017/10/10 0010.
 */
import {indexOf} from '../var/arr'
import {rneedsContext} from './var'

export default function (mQuery) {
  /* eslint-disable no-useless-escape */
  const risSimple = /^.[^:#\[\.,]*$/
  /* eslint-disable no-useless-escape */

  function winnow(elements, qualifier, not) {
    if (mQuery.isFunction(qualifier)) {
      return mQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not
      })
    }

    if (qualifier.nodeType) {
      return mQuery.grep(elements, function (elem) {
        return (elem === qualifier) !== not
      })
    }

    if (typeof qualifier !== 'string') {
      return mQuery.grep(elements, function (elem) {
        return (indexOf.call(qualifier, elem) > -1) !== not
      })
    }

    if (risSimple.test(qualifier)) {
      return mQuery.filter(qualifier, elements, not)
    }

    qualifier = mQuery.filter(qualifier, elements)

    return mQuery.grep(elements, function (elem) {
      return (indexOf.call(qualifier, elem) > -1) !== not && elem.nodeType === 1
    })
  }

  mQuery.filter = function (expr, elems, not) {
    let elem = elems[0]

    if (not) {
      expr = ':not(' + expr + ')'
    }

    if (elems.length === 1 && elem.nodeType === 1) {
      return mQuery.find.matchesSelector(elem, expr) ? [elem] : []
    }

    return mQuery.find.matches(expr, mQuery.grep(elems, function (elem) {
      return elem.nodeType === 1
    }))
  }

  mQuery.fn.extend({
    find(selector) {
      let i, ret
      const self = this
      const len = this.length
      if (typeof selector !== 'string') {
        return this.pushStack(mQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (mQuery.contains(self[i], this)) {
              return true
            }
          }
        }))
      }

      ret = this.pushStack([])

      for (i = 0; i < len; i++) {
        mQuery.find(selector, self[i], ret)
      }

      return len > 1 ? mQuery.uniqueSort(ret) : ret
    },
    filter(selector) {
      return this.pushStack(winnow(this, selector || [], false))
    },
    not(selector) {
      return this.pushStack(winnow(this, selector || [], true))
    },
    is(selector) {
      return !!winnow(this, typeof selector === 'string' && rneedsContext().test(selector)
        ? mQuery(selector) : selector || [], false).length
    }
  })
}
