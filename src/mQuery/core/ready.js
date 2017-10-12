
export default function (mQuery) {
  const readyList = mQuery.Deferred()
  mQuery.fn.ready = function (fn) {
    readyList.then(fn).catch(function (error) {
      mQuery.readyException(error)
    })
    return this
  }

  mQuery.extend({
    isReady: false,
    readyWait: 1,
    ready(wait) {
      if (wait === true ? --mQuery.readyWait : mQuery.isReady) {
        return
      }

      mQuery.isReady = true

      if (wait !== true && --mQuery.readyWait > 0) {
        return
      }

      readyList.resolveWith(document, [mQuery])
    }
  })

  mQuery.ready.then = readyList.then

  function completed() {
    document.removeEventListener('DOMContentLoaded', completed)
    window.removeEventListener('load', completed)
    mQuery.ready()
  }

  if (document.readyState === 'complete' ||
    (document.ready !== 'loading' &&
      !document.documentElement.doScroll)) {
    window.setTimeout(mQuery.ready)
  } else {
    document.addEventListener('DOMContentLoaded', completed)
    window.addEventListener('load', completed)
  }
}