/*
export function someAction (context) {
}
*/
import semester from '@/network/semester'

export function get (context) {
  semester.get().then(res => {
    if (res.code === '0') {
      console.log(res.msg)
      context.commit('init', res.data)
    }
  })
}
