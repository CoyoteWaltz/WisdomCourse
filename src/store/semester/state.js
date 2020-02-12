export default {
  // 记录学期的信息   不存了！！ 每次都重新获取
  // 学期的信息 在ClassList 和 OpenCourse中获取到会往这里存 and 更新
  // semesterOptions: [
  //   {
  //     id: 1,
  //     value: 1,
  //     label: 'xxx',
  //     register_start: '2019-10-2',
  //     register_end: '2019-12-2',
  //     selection_start: '2019-1-2',
  //     selection_end: '2019-2-2',
  //     credit_ceiling: 33
  //   }
  // ]
  // 这两个数据一次请求就可以得到 得到之后存入store
  semesterOptions: [],
  currentSemester: []
}
