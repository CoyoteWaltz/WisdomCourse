/*
export function someGetter (state) {
}
*/
// 获取历史学期的options
export function getHistoryOptions (state) {
  return state.semester_list.filter(value => {
    return value.name <= state.current_semester.name
  }).map((value) => {
    return {
      value: value.id,
      label: value.name
    }
  })
}
// 是否请求过
export function isGot (state) {
  return state.semester_list !== null &&
        state.current_semester !== null
}
// 未来学期
export function getFutureOptions (state) {
  return state.semester_list.filter(value => {
    return value.name >= state.current_semester.name
  }).map((value) => {
    return {
      value: value.id,
      label: value.name
    }
  })
}
