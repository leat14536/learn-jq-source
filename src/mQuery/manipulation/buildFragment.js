/**
 * Created by Administrator on 2017/10/10 0010.
 */
import {mQuery} from '../core'
import {rtagName} from './var'
import {getAll} from './getAll'
import {setGlobalEval} from './setGlobalEval'

const rhtml = /<|&#?\w+;/

export function buildFragment(elems, context, scripts, selection, ignored) {
  let elem, wrap, i
  const l = elems.length
  const fragment = context.createDocumentFragment()
  const nodes = []

  for (i = 0; i < l; i++) {
    elem = elems[i]
    if (elem || elem === 0) {
      if (mQuery.type(elem) === 'object') {
        mQuery.merge(nodes, elem.nodeType ? [elem] : elem)
      } else if (!rhtml.test(elem)) {
        nodes.push(context.createTextNode(elem))
      } else {
        tmp = tmp || fragment.appendChild(context.createElement("div"))
        tag = (rtagName.exec(elem) || ["", ""] )[1].toLowerCase()
        wrap = wrapMap[tag] || wrapMap._default
        tmp.innerHTML = wrap[1] + mQuery.htmlPrefilter(elem) + wrap[2]
        j = wrap[0]
        while (j--) {
          tmp = tmp.lastChild
        }

        mQuery.merge(nodes, tmp.childNodes)

        tmp = fragment.firstChild
        tmp.textContent = ""
      }
      fragment.textContent = ""
      i = 0
      while ((elem = nodes[i++])) {

        if (selection && mQuery.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem)
          }
          continue
        }

        contains = mQuery.contains(elem.ownerDocument, elem)

        tmp = getAll(fragment.appendChild(elem), "script")

        if (contains) {
          setGlobalEval(tmp)
        }

        if (scripts) {
          j = 0
          while (( elem = tmp[j++] )) {
            if (rscriptType.test(elem.type || "")) {
              scripts.push(elem)
            }
          }
        }
      }

      return fragment
    }
  }
}
