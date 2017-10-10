/**
 * Created by Administrator on 2017/10/8 0008.
 */
import {rsingleTag} from './var'
/* eslint-disable */
export default function (mQuery) {
  mQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== 'string') return []
    if (typeof context === 'boolean') {
      keepScripts = context
      context = false
    }

    if (!context) {
      // safari 8 使用createElement会出错, jq在这里做了处理
      // ...
      context = document
    }

    // parsed[1] -> 标签名
    let parsed = rsingleTag.exec(data)
    // const scripts = !keepScripts && []

    // 单一标签
    if (parsed) {
      return [context.createElement(parsed[1])]
    }

    // parsed = buildFragment([data], context, scripts)
    // if (scripts && scripts.length) {
    //   mQuery(scripts).remove()
    // }
    // return mQuery.merge([], parsed.childNodes)
  }
}
