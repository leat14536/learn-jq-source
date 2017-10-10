/**
 * Created by Administrator on 2017/10/7 0007.
 */
import {rsingleTag} from './var'
const rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/

export default function (mQuery) {
  let rootjQuery

  const init = mQuery.fn.init = function (selector, context, root) {
    // HANDLE: $(""), $(null), $(undefined), $(false)
    let match
    if (!selector) return this

    root = root || rootjQuery

    if (typeof selector === 'string') {
      // html标签处理
      if (selector[0] === '<' &&
        selector[selector.length - 1] === '>' &&
        selector.length >= 3) {
        match = [null, selector, null]
      } else {
        // match 存在的话就是 html字符串 / id选择器
        match = rquickExpr.exec(selector)
      }

      if (match && (match[1] || !context)) {
        if (match[1]) {
          // 标签 '   <div>a</div>asb' -> '<div>a</div>'
          context = context instanceof mQuery ? context[0] : context
          mQuery.merge(this, mQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ))

          // $(html, attr)添加html的attr
          if (rsingleTag.test(match[1]) && mQuery.isPlainObject(context)) {
            for (match in context) {
              if (mQuery.isFunction(this[match])) {
                this[match](context[match])
              } else {
                this.attr(match, context[match])
              }
            }
          }
        } else {
          // id
          const elem = document.getElementById(match[2])
          if (elem) {
            this[0] = elem
            this.length = 1
          }
          return this
        }
      } else if (!context || context.mQuery) {
        // 调用sizzle从document中选择并返回
        return (context || root).find(selector)
      } else {
        // 调用sizzle从context中选择并返回
        return this.constructor(context).find(selector)
      }
    } else if (selector.nodeType) {
      // dom节点
      this[0] = selector
      this.length = 1
      return this
    } else if (mQuery.isFunction(selector)) {
      return root.ready !== undefined ? root.readt(selector) : selector(mQuery)
    }

    return mQuery.makeArray(selector, this)
  }

  init.prototype = mQuery.fn
  rootjQuery = mQuery(document)
}
