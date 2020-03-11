import axios from 'axios'
import {Notify} from 'quasar'
// 如果以后要换框架，直接修改下面的函数体 重新用Promise封装就好了

// const serverUrl = 'http://127.0.0.1:8088/api/v1.0'
const serverUrl = 'http://118.25.153.140:88/wisdomapi/v1.0'

export function request (config) {
  const instance = axios.create({
    baseURL: serverUrl,
    timeout: 6000
  })
  // 拦截器
  // request interceptor
  instance.interceptors.request.use(config => {
    // 头部添加Authorization: token
    const token = window.sessionStorage.getItem('token')
    if (token) {
      // 第一位放了用户身份哈
      config.headers.Authorization = 'JWT ' + token.slice(1)
    }
    config.headers['content-type'] = 'application/json'
    console.log(config)
    return config
  }, err => {
    // window.console.log(err)
    return err
  })

  // response interceptor
  instance.interceptors.response.use(res => {
    // 剥离出数据即可
    if (res.data && res.data.code !== '0') {
      Notify.create({
        // message: '操作错误: ' + res.data.msg,
        message: '后台操作错误: ' + res.data.msg,
        icon: 'mood_bad',
        color: 'red-12'
      })
      return res.data
    }
    return res.data
  }, err => {
    Notify.create({
      message: '网络错误: ' + err,
      icon: 'mood_bad',
      color: 'negative'
    })
    return Promise.reject(err)
  })

  return instance(config) // 直接返回promise对象 更粗暴
}
