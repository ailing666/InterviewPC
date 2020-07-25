import _fetch from '@/util/fetch.js'
export function getUserList (params) {
  return _fetch({
    url: '/user/list',
    params
  })
}
// 设置状态
export function setStatus (data) {
  return _fetch({
    url: '/user/status',
    data,
    method: 'post'
  })
}
// 删除
export function delList (data) {
  return _fetch({
    url: '/user/remove',
    data,
    method: 'post'
  })
}

export function addList (data) {
  return _fetch({
    url: '/user/add',
    data,
    method: 'post'
  })
}
export function editList (data) {
  return _fetch({
    url: '/user/edit',
    data,
    method: 'post'
  })
}
