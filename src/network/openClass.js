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
  },
  getStuInfo (classId) {
    // 获取学生信息
    return request({
      method: 'get',
      url: '/classes/' + classId
    })
  },
  searchClasses (searchInfo) {
    // 搜索课程
    return request({
      method: 'get',
      url: '/classes/query',
      params: searchInfo
    })
  },
  cancelClass (clsId) {
    return request({
      method: 'delete',
      url: '/classes/' + clsId
    })
  },
  updateScore (updateInfo) {
    return request({
      method: 'patch',
      url: '/classes/' + updateInfo.id,
      data: updateInfo.scoreList
    })
  }
}
