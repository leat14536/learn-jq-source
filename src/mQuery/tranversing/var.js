/**
 * Created by Administrator on 2017/10/10 0010.
 */
import {mQuery} from '../core'

export const rneedsContext = () => mQuery.expr.match.needsContext

export function dir(elem, dir, until) {
  const matched = []
  const truncate = until !== undefined

  // nodeType === 9 -> document
  while ((elem = elem[dir]) && elem.nodeType !== 9) {
    if (elem.nodeType === 1) {
      if (truncate && mQuery(elem).is(until)) {
        break
      }
      matched.push(elem)
    }
  }
  return matched
}

export function siblings(n, elem) {
  const matched = []
  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== elem) {
      matched.push(n)
    }
  }
  return matched
}

export function sibling(cur, dir) {
  while ((cur = cur[dir]) && cur.nodeType !== 1) {
  }
  return cur
}
