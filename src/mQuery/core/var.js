/**
 * Created by Administrator on 2017/10/9 0009.
 */
/* eslint-disable no-useless-escape */
// 判断是不是一个合法的标签的正则
export const rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
