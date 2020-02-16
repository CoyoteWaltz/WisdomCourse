import {request} from './request'

export default {
  get () {
    // 获取所有学期的list 和 当前学期对象
    return request({
      method: 'get',
      url: '/semesters'
    })
  },
  getHistory () {
    // 获取所有学期的list 和 当前学期对象
    return request({
      method: 'get',
      url: '/semesters/history'
    })
  },
  getFuture () {
    // 获取所有学期的list 和 当前学期对象
    return request({
      method: 'get',
      url: '/semesters/future'
    })
  },
  getClasses (semesterId) {
    // 获取学期的课程 切换学期的时候用到
    return request({
      method: 'get',
      url: '/classes',
      params: {
        semester: semesterId
      }
    })
  }
}
