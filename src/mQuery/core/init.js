/**
 * Created by Administrator on 2017/10/7 0007.
 */
import {mQuery} from '../core'

let rootjQuery = mQuery(document)
const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/

const init = mQuery.fn.init = function (selector, context, root) {
  // HANDLE: $(""), $(null), $(undefined), $(false)
  let match
  if (!selector) return this

  root = root || rootjQuery

  if (typeof selector === 'string') {
    // 创建html标签
    if (selector[0] === "<" &&
      selector[selector.length - 1] === ">" &&
      selector.length >= 3) {

      // Assume that strings that start and end with <> are HTML and skip the regex check
      match = [null, selector, null]
    } else {
      match = rquickExpr.exec(selector)
    }

    if (match && (match[1] || !context)) {
      if(match[1]) {
        context = context instanceof mQuery ? context[ 0 ] : context
        mQuery.merge(this, mQuery.parseHTML(
          match[1],
          context && context.nodeType ?context.ownerDocument || context : document,
          true
        ))
      }
    }
  }

}
