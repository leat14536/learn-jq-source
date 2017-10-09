/**
 * Created by Administrator on 2017/10/9 0009.
 */
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
    closest() {
      console.log('=============')
    },
    index(elem) {
      console.log('=============')
    },
    add(selector, context) {
      console.log('=============')
    },
    addBack(selector) {
      console.log('=============')
    }
  })

  mQuery.each({
    parent() {
      console.log('=============')
    },
    parents() {
      console.log('=============')
    },
    parentsUntil() {
      console.log('=============')
    },
    next() {
      console.log('=============')
    },
    prev() {
      console.log('=============')
    },
    nextAll() {
      console.log('=============')
    },
    prevAll() {
      console.log('=============')
    },
    nextUntil() {
      console.log('=============')
    },
    prevUntil() {
      console.log('=============')
    },
    siblings() {
      console.log('=============')
    },
    children() {
      console.log('=============')
    },
    contents() {
      console.log('=============')
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
