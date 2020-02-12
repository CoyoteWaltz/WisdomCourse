/*
export function someMutation (state) {
}
*/
export function updateSemesterOptions (state, semesterObj) {
  state.semesterOptions = semesterObj.semesterOptions
  state.currentSemester = semesterObj.currentSemester
}
