/**
 * Created by Administrator on 2017/10/10 0010.
 */
export function nodeName(elem, name) {
  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
}
