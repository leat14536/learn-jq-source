/**
 * Created by Administrator on 2017/10/10 0010.
 */
export function setGlobalEval(elems, refElements) {
  let i = 0
  const l = elems.length

  for (; i < l; i++) {
    dataPriv.set(
      elems[i],
      "globalEval",
      !refElements || dataPriv.get(refElements[i], "globalEval")
    )
  }
}
