// 导入axios
import axios from 'axios'
import { Message } from 'element-ui'
// 创建axios副本
let _fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // 跨域带token
  withCredentials: true
})
// 添加请求拦截器
_fetch.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_fetch.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
      return response.data
    } else if (response.data.code == 202) {
      Message.error('验证码错误')
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default _fetch
