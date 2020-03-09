/*
export function someMutation (state) {
}
*/
import Utils from 'common/utils'

export function loadFromWindow (state, payload) {
  state.current_semester = payload.current_semester
  state.semester_list = payload.semester_list
}

// 接受data对象包含current_semester不在semester_list中
export function init (state, payload) {
  console.log('init')
  console.log(payload)
  state.current_semester = payload.current_semester
  // state.current_semester.value = state.current_semester.id
  // state.current_semester.label = state.current_semester.name
  state.semester_list = payload.semester_list
  // state.semester_list.forEach(value => {
  //   value.value = value.id
  //   value.label = value.name
  // })
  state.semester_list.push(Utils.deepCopy(payload.current_semester))
  console.log(state)
}
// 切换学期 直接接受新的对象 deepCopy
export function switchCurrent (state, payload) {
  state.current_semester = Utils.deepCopy(payload)
}
// 更新某学期的课程
export function addClassList (state, payload) {
  for (let i of state.semester_list) {
    if (i.id === payload.id) {
      i.class_list = payload.data
    }
  }
}
// 增加一个新学期
export function addSemester (state, payload) {
  let temp = Utils.deepCopy(payload)
  state.semester_list.push(temp)
}
