/**
 * Created by Administrator on 2017/10/10 0010.
 */
import {rnothtmlwhite} from './var/reg'

export default function (mQuery) {
  function createOptions(options) {
    const obj = {}
    mQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true
    })
    return obj
  }

  function fire() {
    console.log('fire')
  }

  mQuery.Callbacks = function (option) {
    options = typeof options === 'string' ? createOptions(options) : mQuery.extend({}, options)
    let queue = []
    let locked
    let list = []
    let firingIndex = -1
    let memory, firing, fired

    const self = {
      add(list) {
        if (list) {
          if (memory && !firing) {
            console.log('=============')
          }

          (function add(args) {
            mQuery.each(args, function (_, arg) {
              if (mQuery.isFunction(arg)) {
                if (!options.unique || !self.has(arg)) {
                  list.push(arg)
                } else if (arg && arg.length && jQuery.type(arg) !== 'string') {
                  add(arg)
                }
              }
            })
          })(arguments)

          if (memory && !firing) {
            fire()
          }
        }

        return this
      },
      remove() {
        mQuery.each(arguments, function (_, arg) {
          let index
          while ((index = mQuery.inArray(arg, list, index)) > -1) {
            list.splice(index, 1)
            if (index <= firingIndex) {
              firingIndex--
            }
          }
        })
      },
      has(fn) {
        return fn ? mQuery.inArray(fn, list) > -1 : list.length > 0
      },
      empty() {
        if (list) {
          list = []
        }
        return this
      },
      disable() {
        locked = queue = []
        list = memory = ''
        return this
      },
      disabled() {
        return !list
      },
      lock() {
        locked = queue = []
        if (!memory && !firing) {
          list = memory = ''
        }
        return this
      },
      locked() {
        return !!locked
      },
      fireWith(context, args) {
        if (!locked) {
          args = args || []
          args = [context, args.slice ? args.slice() : args]
          queue.push(args)
          if (!firing) {
            fire()
          }
        }
        return this
      },
      fire() {
        self.fireWith(this, arguments)
        return this
      },
      fired() {
        return !!fired
      }
    }
    return self
  }
}
