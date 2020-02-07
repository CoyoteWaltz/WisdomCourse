/*
export function someGetter (state) {
}
*/
export function isLogin (state) {
  return state.info.identity >= 0
}
