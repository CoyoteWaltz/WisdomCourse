import {request} from './request'

export default {
  get () {
    // 获取所有学期的list 和 当前学期对象
    return request({
      method: 'get',
      url: '/teachers'
    })
  }
}
