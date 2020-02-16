/*
export function someMutation (state) {
}
*/
import Utils from 'common/utils'
// 初始化网络得到的数据
export function init (state, payload) {
  console.log('init teacher')
  state.teacher_list = payload
  state.teacher_list.forEach((value, index) => {
    value.index = index + 1
  })
}
// 添加一个
export function addOne (state, payload) {
  let temp = Utils.deepCopy(payload)
  temp.index = state.teacher_list.length + 1
  state.teacher_list.push(temp)
}
