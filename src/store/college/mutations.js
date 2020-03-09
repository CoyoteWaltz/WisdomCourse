/*
export function someMutation (state) {
}
export function init (state, payload) {
*/
import Utils from 'common/utils'

export function loadFromWindow (state, payload) {
  console.log(payload)
  state.college_list = payload.college_list
}

export function init (state, payload) {
  state.college_list = payload
  // state.college_list.forEach(value => {
  //   value.value = value.id
  //   value.label = value.name
  // })
}
// 成功添加一个课程调用
export function addOne (state, newInfo) {
  console.log('添加一个课程')
  console.log(newInfo)
  for (let college of state.college_list) {
    if (college.id === newInfo.college_id) {
      college.course_list.push(Utils.deepCopy(newInfo))
    }
  }
}
