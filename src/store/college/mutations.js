/*
export function someMutation (state) {
}
export function init (state, payload) {
*/
import Utils from 'common/utils'

export function loadFromWindow (state, payload) {
  state.college_list = payload.college_list
}

export function init (state, payload) {
  state.college_list = payload
}
// 成功添加一个课程调用
export function addOne (state, newInfo) {
  for (let college of state.college_list) {
    if (college.id === newInfo.college_id) {
      college.course_list.push(Utils.deepCopy(newInfo))
    }
  }
}
