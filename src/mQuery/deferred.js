import {slice} from './var/arr'

export default function (mQuery) {
  function adopValue(value, resolve, reject, noValue) {
    let method
    try {
      if (value && mQuery.isFunction((method = value.promise))) {
        method.call(value).done(resolve).fail(reject)
      } else if (value && mQuery.isFunction((method = value.then))) {
        method.call(value, resolve, reject)
      } else {
        resolve.apply(undefined, [value].slice(noValue))
      }
    } catch (value) {
      /* eslint-disable no-useless-call */
      reject.apply(undefined, [value])
      /* eslint-disable no-useless-call */
    }
  }

  mQuery.extend({
    Deferred(func) {
      const tuples = [
        ['notify', 'progress', mQuery.Callbacks('memory'),
          mQuery.Callbacks('memory'), 2],
        ['resolve', 'done', mQuery.Callbacks('once memory'),
          mQuery.Callbacks('once memory'), 0, 'resolved'],
        ['reject', 'fail', mQuery.Callbacks('once memory'),
          mQuery.Callbacks('once memory'), 1, 'rejected']
      ]
      let state = 'pending'
      const deferred = {}

      const promise = {
        state() {
          return state
        },
        always() {
          deferred.done(arguments).fail(arguments)
          return this
        },
        'catch': function (fn) {
          return promise.then(null, fn)
        },
        pipe() {
          console.log('pipe')
        },
        then() {
          console.log('then')
        },
        promise(obj) {
          return obj != null ? mQuery.extend(obj, promise) : promise
        }
      }

      mQuery.each(tuples, (i, tuple) => {
        const list = tuple[2]
        const stateString = tuple[5]

        promise[tuple[1]] = list.add

        if (stateString) {
          list.add(
            () => {
              state = stateString
            },
            tuples[3 - i][2].disable,
            tuples[3 - i][3].disable,
            tuples[0][2].lock,
            tuples[0][3].lock
          )
        }

        list.add(tuple[3].fire)

        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](this === deferred ? undefined : this, arguments)
          return this
        }

        deferred[tuple[0] + 'With'] = list.fireWith
      })

      promise.promise(deferred)

      if (func) {
        func.call(deferred, deferred)
      }

      return deferred
    },
    when(singleValue) {
      let remaining = arguments.length
      let i = remaining
      let resolveContexts = Array(i)
      let resolveValues = slice.call(arguments)
      const master = mQuery.Deferred()
      const updateFunc = function (i) {
        return function (value) {
          resolveContexts[i] = this
          resolveValues = arguments.length > 1 ? slice.call(arguments) : value
          if (!(--remaining)) {
            master.resolveWith(resolveContexts, resolveValues)
          }
        }
      }
      if (remaining <= 1) {
        adopValue(singleValue, master.done(updateFunc(i)).resolve, master.reject, !remaining)
        if (master.state() === 'pending' ||
          mQuery.isFunction(resolveValues[i] && resolveValues[i].then)) {
          return master.then()
        }
      }

      while (i--) {
        adopValue(resolveValues[i], updateFunc(i))
      }
      return master.promise
    }
  })
}