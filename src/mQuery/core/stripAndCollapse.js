import {rnothtmlwhite} from '../var/reg'
export function stripAndCollapse(value) {
  const tokens = value.match(rnothtmlwhite) || []
  return tokens.join(' ')
}