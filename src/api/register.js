import _fecth from '@/util/fetch.js'
// 获取短信验证码
export function sendCode (data) {
  return _fecth({
    url: '/sendsms',
    data,
    method: 'post'
  })
}
// 用户注册
export function userRegister (data) {
  return _fecth({
    url: '/register',
    data,
    method: 'post'
  })
}
