/*
export function someGetter (state) {
}
*/
// 获取历史学期的options
export function getHistoryOptions (state) {
  console.log(state.semester_list)
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
// 获取查课学期
export function available (state, getters) {
  // 如果未来学期的选课时间符合当前loacl time 就用最新的
  // 否则 返回当前学期
  console.log(state)
  console.log(getters)
  if (!getters.isGot) {
    return ''
  }
  const currentName = state.current_semester.name
  const now = new Date()
  for (let s in state.semester_list) {
    if (s.name >= currentName && s.time) {
      // 满足未来学期
      // 此时是在该学期的选课时间内的
      if (now > new Date(s.selection_start) && now < new Date(s.selection_end)) {
        return s.name
      }
    }
  }
  return currentName
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
