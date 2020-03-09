/*
export function someMutation (state) {
}
*/
export function loadFromWindow (state, payload) {
  state.info = payload.info
  state.selectedClasses = payload.selectedClasses
}

export function login (state, userPayload) {
  // 从sessionStorage里面获取token，将数据同步
  // 在app的created钩子中更新所有的state
  console.log(state)
  console.log(userPayload)
  state.info.username = userPayload.name
  state.info.identity = userPayload.privilege
  state.info.userNo = userPayload.user_no
  state.info.collegeId = userPayload.college_id
  state.info.collegeName = userPayload.college_name
  console.log('login')
  console.log(state)
}

export function logout (state) {
  console.log(state)
  // state.username = '游客'
  // state.identity = -1
  // state.stuNo = ''
  // state.lastTime = ''
  // state.intergal = null
  state.info = {
    username: '游客',
    identity: -1,
    stuNo: '',
    lastTime: '', // 上次登陆时间
    intergal: null // 积分
  }
  // 清空local storage的token
  console.log('logout')
}

export function addSelection (state, classObj) {
  if (state.selectedClasses.length >= 6) {
    return
  }
  for (let i of state.selectedClasses) {
    if (classObj.id === i.id) {
      return
    }
  }
  state.selectedClasses.push(classObj)
}

export function removeSelection (state, clsId) {
  state.selectedClasses.splice(state.selectedClasses.findIndex((value, index) => {
    return value.id === clsId
  }), 1)
}

export function removeAllSelection (state) {
  state.selectedClasses = []
}

export function updateSelectionStatus (state, statusArr) {
  // 根据statusArr中元素的id 修改对应的info字段和状态
  // 但是感觉是O(M * N)的。。。
  state.selectedClasses.forEach((value, index) => {
    for (let s of statusArr) {
      if (s.id === value.id) {
        value.info = s.reason
        value.select_status = false
      }
    }
  })
}
