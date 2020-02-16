/*
export function someGetter (state) {
}
*/
import Utils from 'common/utils'
export function isGot (state) {
  return state.college_list !== null
}
// 返回一份copy数据
export function copy (state) {
  if (state.college_list !== null) {
    return Utils.deepCopy(state.college_list)
  }
  return []
}

export function selectOptions (state) {
  if (state.college_list === null) {
    return []
  }
  return state.college_list.map(value => {
    return {
      id: value.id,
      value: value.id,
      label: value.college_name
    }
  })
}
