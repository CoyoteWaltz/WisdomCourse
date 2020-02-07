/*
export function someMutation (state) {
}
*/
export function login (state, userPayload) {
  console.log(state)
  console.log(userPayload)
  state.info = userPayload.info
  // state.username = userPayload.username
  // state.identity = userPayload.identity
  // state.stuNo = userPayload.stuNo
  // state.lastTime = userPayload.lastTime
  // state.intergal = userPayload.intergal
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
