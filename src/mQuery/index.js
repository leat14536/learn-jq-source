/**
 * Created by Administrator on 2017/10/7 0007.
 */
import {mQuery} from './core'
import init from './core/init'
import selector from './sizzle'
import traversing from './traversing'
import parseHTML from './core/parseHTML'

selector(mQuery) // 加载sizzle模块
init(mQuery) // 加载init
parseHTML(mQuery) // 加载parseHTML
traversing(mQuery)

export default mQuery
