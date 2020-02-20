import {request} from './request'

export default {
  get () {
    // 获取所有学院和其所有的课程
    // return request({
    //   method: 'get',
    //   url: '/courses'
    // })
  },
  newOpen (openInfo) {
    // 开课
    return request({
      method: 'post',
      url: '/classes',
      data: openInfo
    })
  }
}
