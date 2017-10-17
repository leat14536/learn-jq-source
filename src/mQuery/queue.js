import { dataPriv } from './data/var'

export default function (mQuery) {
  mQuery.extend({
    queue(elem, type, data) {
      let queue
      if (elem) {
        type = `${type || 'fx'}queue`
        queue = dataPriv.get(elem, type)

        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, mQuery.makeArray(data))
          } else {
            queue.push(data)
          }
        }
        return queue || []
      }
    },
    dequeue(elem, type) {
      type = type || 'fx'

      const queue = mQuery.queue(elem, type)
      let startLength = queue.length
      let fn = queue.shift()
      const hooks = mQuery._queueHooks(elem, type)
      const next = function () {
        mQuery.dequeue(elem, type)
      }

      // 移除哨兵
      if (fn === 'inprogress') {
        fn = queue.shift()
        startLength--
      }

      // 可能是为了容错吧添加哨兵节点, 可能在hooks.empty.fire()中吧
      // 先放下
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress')
        }

        delete hooks.stop
        fn.call(elem, next, hooks)
      }

      if (!startLength && hooks) {
        hooks.empty.fire()
      }
    },
    _queueHooks(elem, type) {
      const key = `${type}queueHooks`
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: mQuery.Callbacks('once memory').add(() => {
          dataPriv.remove(elem, [`${type}queue`, key])
        })
      })
    }
  })

  mQuery.fn.extend({
    queue(type, data) {
      let setter = 2
      if (typeof type !== 'string') {
        data = type
        type = 'fx'
        setter--
      }

      if (arguments.length < setter) {
        return mQuery.queue(this[0], type)
      }

      return data === undefined
        ? this
        : this.each(() => {
          const queue = mQuery.queue(this, type, data)

          mQuery._queueHooks(this, type)

          if (type === 'fx' && queue[0] !== 'inprogress') {
            mQuery.dequeue(this, type)
          }
        })
    },
    dequeue(type) {
      return this.each(() => {
        mQuery.dequeue(this, type)
      })
    },
    clearQueue(type) {
      return this.queue(type || 'fx', [])
    },
    promise(type, obj) {
      const defer = mQuery.Deferred()
      const elements = this
      let count = 1
      let i = this.length
      const resolve = () => {
        if (!(--count)) {
          defer.resolveWith(elements, [elements])
        }
      }
      let tmp

      if (typeof type !== 'string') {
        obj = type
        type = undefined
      }

      type = type || 'fx'
      while (i--) {
        tmp = dataPriv.get(elements[i], type + 'queueHooks')
        if (tmp && tmp.empty) {
          count++
          tmp.empty.add(resolve)
        }
      }

      resolve()
      return defer.promise(obj)
    }
  })
}