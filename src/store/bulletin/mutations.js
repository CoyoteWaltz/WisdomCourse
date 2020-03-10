/*
export function someMutation (state) {
}
*/

export function loadFromWindow (state, payload) {
  state.message = payload.message
}

export function replaceMsg (state, msgPayload) {
  state.message = msgPayload
}
