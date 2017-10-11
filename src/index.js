import mQuery from 'jQuery'

mQuery.Deferred((_, __) => {
  _.resolve(3)
}).then(n => console.log(n))
export default mQuery