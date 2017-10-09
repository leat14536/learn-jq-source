/**
 * Created by Administrator on 2017/10/9 0009.
 */
import Sizzle from 'external/sizzle/dist/sizzle'
export default function (mQuery) {
  mQuery.find = Sizzle
  mQuery.expr = Sizzle.selectors
  mQuery.expr[':'] = mQuery.expr.pseudos
  mQuery.uniqueSort = mQuery.unique = Sizzle.uniqueSort
  mQuery.text = Sizzle.getText
  mQuery.isXMLDoc = Sizzle.isXML
  mQuery.contains = Sizzle.contains
  mQuery.escapeSelector = Sizzle.escape
}
