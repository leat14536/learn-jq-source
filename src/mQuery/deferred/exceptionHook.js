
export default function (mQuery) {
  const rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/
  mQuery.Deferred.exceptionHook = function (error, stack) {
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn('mQuery.Deferred exception: ' + error.message, error.stack, stack)
    }
  }
}