import {request} from './request'

export default {
  login (loginData) {
    return request({
      method: 'post',
      url: '/user/login',
      data: loginData
    })
  }
}
