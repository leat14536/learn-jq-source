/**
 * Created by Administrator on 2017/10/9 0009.
 */
import {indexOf} from './var/arr'
import {nodeName} from './core/nodeName'
import {rneedsContext, dir, siblings, sibling} from './tranversing/var'

const guaranteedUnique = {
  children: true,
  contents: true,
  next: true,
  prev: true
}
export default function (mQuery) {
  const rparentsprev = /^(?:parents|prev(?:Until|All))/

  mQuery.fn.extend({
    has(target) {
      const targets = mQuery(target, this)
      const l = targets.length

      return this.filter(() => {
        for (let i = 0; i < l; i++) {
          if (mQuery.contains(this, targets[i])) {
            return true
          }
        }
      })
    },
    closest(selectors, context) {
      let i, cur
      const matched = []
      const targets = typeof selectors !== 'string' && mQuery(selectors)
      const l = this.length
      if (!rneedsContext().test(selectors)) {
        for (i = 0; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            if (cur.nodeType < 11 &&
              (targets ? targets.index(cur) > -1 : cur.nodeType === 1 &&
                mQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur)
              break
            }
          }
        }
      }
      return this.pushStack(matched.length > 1 ? mQuery.uniqueSort(matched) : matched)
    },
    index(elem) {
      if (!elem) return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
      if (typeof elem === 'string') return indexOf.call(mQuery(elem), this[0])
      return indexOf.call(this, elem.mQuery ? elem[0] : elem)
    },
    add(selector, context) {
      return this.pushStack(mQuery.uniqueSort(
        mQuery.merge(this.get(), mQuery(selector, context))
      ))
    },
    addBack(selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
    }
  })

  mQuery.each({
    parent(elem) {
      const parent = elem.parentNode
      // documentFragment
      return parent && parent.nodeType !== 11 ? parent : null
    },
    parents(elem) {
      return dir(elem, 'parentNode')
    },
    parentsUntil(elem, i, until) {
      return dir(elem, 'parentNode', until)
    },
    next(elem) {
      return sibling(elem, 'nextSibling')
    },
    prev(elem) {
      return sibling(elem, 'previousSibling')
    },
    nextAll(elem) {
      return dir(elem, 'nextSibling')
    },
    prevAll(elem) {
      return dir(elem, 'previousSibling')
    },
    nextUntil(elem, i, until) {
      return dir(elem, 'nextSibling', until)
    },
    prevUntil(elem, i, until) {
      return dir(elem, 'previousSibling', until)
    },
    siblings(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem)
    },
    children(elem) {
      return siblings(elem.firstChild)
    },
    contents(elem) {
      if (nodeName(elem, 'iframe')) {
        return elem.contentDocument
      }
      if (nodeName(elem, 'template')) {
        elem = elem.content || elem
      }
      return mQuery.merge([], elem.childNodes)
    }
  }, (name, fn) => {
    mQuery.fn[name] = function (until, selector) {
      let matched = mQuery.map(this, fn, until)

      if (name.slice(-5) !== 'Until') {
        selector = until
      }

      if (selector && typeof selector === 'string') {
        matched = mQuery.filter(selector, matched)
      }

      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          mQuery.uniqueSort(matched)
        }
        if (rparentsprev.test(name)) {
          matched.reverse()
        }
      }

      return this.pushStack(matched)
    }
  })
}
