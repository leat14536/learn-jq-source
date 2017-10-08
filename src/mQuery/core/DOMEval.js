/**
 * Created by Administrator on 2017/10/8 0008.
 */

export function DOMEval(code, doc) {
  doc = doc || document
  const script = doc.createElement('script')

  script.text = code
  doc.head.appendChild(script).parentNode.removeChild(script)
}
