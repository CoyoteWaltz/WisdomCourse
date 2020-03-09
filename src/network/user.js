import {request} from './request'

export default {
  login (loginData) {
    return request({
      method: 'post',
      url: '/user/login',
      data: loginData
    })
  },
  selectClasses (classArr) {
    let clsIdArr = classArr.map((value, index) => {
      return value.id
    })
    console.log(clsIdArr)
    return request({
      method: 'post',
      url: '/classes/selection',
      data: clsIdArr
    })
  }
}
