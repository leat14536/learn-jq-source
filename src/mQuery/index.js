/**
 * Created by Administrator on 2017/10/7 0007.
 */
import selector from './sizzle'
import traversing from './traversing'
import parseHTML from './core/parseHTML'
import {mQuery} from './core'
import init from './core/init'
import findFilter from './tranversing/findFilter'
import callbacks from './callbacks'
import deferred from './deferred'
import exceptionHook from './deferred/exceptionHook'
import readyException from './core/readyException'
import ready from './core/ready'

init(mQuery) // 加载init
selector(mQuery) // 加载sizzle模块
parseHTML(mQuery) // 加载parseHTML
findFilter(mQuery) // filter find ...
traversing(mQuery) // 寻找dom节点的方法
callbacks(mQuery) // 很重要的一个模块 类似订阅模式
deferred(mQuery) // 异步模块
exceptionHook(mQuery) // 处理错误的模块
readyException(mQuery) // ready错误处理
ready(mQuery) // ready方法

export default mQuery