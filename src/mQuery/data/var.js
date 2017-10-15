import {Data} from './index'

export function acceptData(owner) {
  return owner.nodeType === 1 || owner.nodeType === 9 || !(+owner.nodeType)
}

export const dataUser = new Data()

export const dataPriv = new Data()