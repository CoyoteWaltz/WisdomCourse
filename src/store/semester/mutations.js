/*
export function someMutation (state) {
}
*/
import Utils from 'common/utils'

export function loadFromWindow (state, payload) {
  // 得到的semester_list 不包含 current semester
  state.current_semester = payload.current_semester
  state.semester_list = payload.semester_list
}

// 给每个学期设置大小
export function init (state, payload) {
  state.current_semester = payload.current_semester
  state.current_semester.weight = Utils.semester2Value(payload.current_semester.name)
  state.current_semester.label = state.current_semester.name
  state.current_semester.value = state.current_semester.id
  state.semester_list = []
  payload.semester_list.forEach(item => {
    let weight = Utils.semester2Value(item.name)
    if (weight !== -1) {
      item.weight = weight
      item.label = item.name
      item.value = item.id
      state.semester_list.push(item)
    }
  })
  state.semester_list.push(Utils.deepCopy(state.current_semester)) // 最后将当前学期赋值
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
      const temp = Utils.deepCopy(payload.data)
      i.class_list = temp
      if (i.id === state.current_semester.id) {
        state.current_semester.class_list = temp
      }
    }
  }
}
// 增加一个新学期
export function addSemester (state, payload) {
  const temp = Utils.deepCopy(payload)
  temp.weight = Utils.semester2Value(payload.name)
  temp.label = payload.name
  temp.value = payload.id
  state.semester_list.push(temp)
}
// 为对应课程 添加一个开课记录
export function addOneClass (state, payload) {
  // 找到对应的学期 如果有课程list就push
  for (let s of state.semester_list) {
    if (s.id === payload.semester_id && s.class_list !== undefined) {
      const clsObj = Utils.deepCopy(payload.classObj)
      s.class_list.push(clsObj)
      if (s.id === state.current_semester.id) {
        state.current_semester.class_list.push(clsObj)
      }
      return
    }
  }
}
// 删除学期
export function deleteOneSemester (state, payload) {
  state.semester_list.splice(
    state.semester_list.findIndex(value => value.id === payload), 1
  )
}
