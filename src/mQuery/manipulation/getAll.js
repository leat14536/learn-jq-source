/**
 * Created by Administrator on 2017/10/10 0010.
 */
export function getAll(context, tag) {
  let ret

  if (typeof context.getElementsByTagName !== "undefined") {
    ret = context.getElementsByTagName(tag || "*")
  } else if (typeof context.querySelectorAll !== "undefined") {
    ret = context.querySelectorAll(tag || "*")
  } else {
    ret = []
  }

  if (tag === undefined || tag && nodeName(context, tag)) {
    return jQuery.merge([context], ret)
  }

  return ret
}
