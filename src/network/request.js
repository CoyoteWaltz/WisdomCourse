import axios from 'axios'
// 如果以后要换框架，直接修改下面的函数体 重新用Promise封装就好了

const serverUrl = ''

export function request (config) {
  const instance = axios.create({
    baseURL: serverUrl,
    timeout: 5000
  })
  // 拦截器
  // request interceptor
  instance.interceptors.request.use(config => {
    // window.console.log(config)
    // 头部添加Authorization: token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {
    // window.console.log(err)
    return err
  })
  // response interceptor
  instance.interceptors.response.use(res => {
    // window.console.log(res)
    // 剥离出数据即可
    return res.data
  }, err => {
    // window.console.log(err)
    return err
  })

  return instance(config) // 直接返回promise对象 更粗暴
}
