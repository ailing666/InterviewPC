import _fetch from '@/util/fetch.js'

// 登录接口
export function toLogin (data) {
  return _fetch({
    url: '/login',
    data,
    method: 'post'
  })
}
