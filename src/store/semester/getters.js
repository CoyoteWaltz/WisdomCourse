/*
export function someGetter (state) {
}
*/
// 获取历史学期的options
export function getHistoryOptions (state) {
  return state.semester_list.filter(value => {
    return value.weight <= state.current_semester.weight
  }).map((value) => {
    return {
      value: value.id,
      label: value.name
    }
  })
}
// 获取历史学期的options
export function getAllOptions (state) {
  return state.semester_list.map((value) => {
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
    return value.weight > state.current_semester.weight
  }).map((value) => {
    return {
      value: value.id,
      label: value.name
    }
  })
}
// 获取查课学期
export function available (state, getters) {
  // 如果未来学期的选课时间符合当前loacl time 就用最新的
  // 否则 返回当前学期
  if (!getters.isGot) {
    return {
      name: '',
      id: -1
    }
  }
  const currentName = state.current_semester.name
  const currentId = state.current_semester.id
  const now = new Date()
  for (let s in state.semester_list) {
    if (s.weight >= currentName && s.weight) {
      // 满足未来学期
      // 此时是在该学期的选课时间内的
      if (now > new Date(s.selection_start) && now < new Date(s.selection_end)) {
        console.log(s)
        return {
          name: s.name,
          id: s.id
        }
      }
    }
  }
  // 没找到就返回当前学期
  return {
    name: currentName,
    id: currentId
  }
}

export function canSelect (state, getters) {
  if (!getters.isGot) {
    return false
  }
  const now = new Date()
  return now > new Date(state.current_semester.selection_start) && now < new Date(state.current_semester.selection_end)
}

export function canRegister (state, getters) {
  if (!getters.isGot) {
    return false
  }
  const now = new Date()
  return now > new Date(state.current_semester.register_start) && now < new Date(state.current_semester.register_end)
}
