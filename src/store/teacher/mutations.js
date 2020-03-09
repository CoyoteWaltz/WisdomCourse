/*
export function someMutation (state) {
}
*/
import Utils from 'common/utils'

export function loadFromWindow (state, payload) {
  state.info = payload.info
  state.selectedClasses = payload.selectedClasses
}

// 初始化网络得到的数据
export function init (state, payload) {
  console.log('init teacher')
  state.teacher_list = payload
  state.teacher_list.forEach((value, index) => {
    value.index = index + 1
    value.value = value.id
    value.label = value.name + ' ' + value.user_no + ' (' + value.college_name + ')'
  })
}
// 添加一个
export function addOne (state, payload) {
  let temp = Utils.deepCopy(payload)
  temp.index = state.teacher_list.length + 1
  temp.value = temp.id
  temp.label = temp.name + ' ' + temp.user_no + ' (' + temp.college_name + ')'
  state.teacher_list.push(temp)
}
