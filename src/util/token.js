// 保存token
export function saveToken (value) {
  window.localStorage.setItem('token', value)
}
// 获取token
export function getToken () {
  return window.localStorage.getItem('token')
}
// 移除token
export function removeToken () {
  window.localStorage.removeItem('token')
}
