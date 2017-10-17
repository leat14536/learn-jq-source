import attr from './attributes/attr'
import prop from './attributes/prop'
import classes from './attributes/classes'
import val from './attributes/val'

export default function(mQuery) {
  attr(mQuery)
  prop(mQuery)
  classes(mQuery)
  val(mQuery)
}