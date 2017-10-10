/**
 * Created by Administrator on 2017/10/7 0007.
 */
import selector from './sizzle'
import traversing from './traversing'
import parseHTML from './core/parseHTML'
import {mQuery} from './core'
import init from './core/init'
import findFilter from './tranversing/findFilter'

init(mQuery) // 加载init
selector(mQuery) // 加载sizzle模块
parseHTML(mQuery) // 加载parseHTML
findFilter(mQuery) // filter find ...
traversing(mQuery)

export default mQuery
