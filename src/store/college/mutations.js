/*
export function someMutation (state) {
}
export function init (state, payload) {
*/
export function init (state, payload) {
  state.college_list = payload
  // state.college_list.forEach(value => {
  //   value.value = value.id
  //   value.label = value.name
  // })
}
