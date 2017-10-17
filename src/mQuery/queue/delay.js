export default function (mQuery) {
  mQuery.fn.delay = function (time, type) {
    time = mQuery.fx ? mQuery.fx.speeds[time] || time : time
    type = type || 'fx'

    return this.queue(type, function(next, hooks) {
      const timeout = window.setTimeout(next, time)
      hooks.stop = function() {
        window.clearTimeout(timeout)
      }
    })
  }
}