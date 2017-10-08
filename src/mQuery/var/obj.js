/**
 * Created by Administrator on 2017/10/7 0007.
 */
// 原形上的方法
export const {toString} = Object.prototype

// 静态方法
export const {getPrototypeOf, hasOwnProperty} = Object

// hasOwnProperty 上的方法
export const {toString: fnToString} = hasOwnProperty

export const ObjectFunctionString = fnToString.call(Object)

export const class2type = {}
