import {request} from './request'

export default {
  get () {
    // 获取所有学院和其所有的课程
    return request({
      method: 'get',
      url: '/courses'
    })
  },
  newCourse (newInfo) {
    // 创建新课程
    return request({
      method: 'post',
      url: '/courses',
      data: newInfo
    })
  },
  removeCourse (courseId) {
    // 删除某课程
    return request({
      method: 'delete',
      url: '/courses' + '/' + courseId
    })
  }
}
