
export default function (mQuery) {
  mQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error
    })
  }
}