import _fetch from '@/util/fetch.js'
export function getEnterpriseList (params) {
  return _fetch({
    url: '/enterprise/list',
    params
  })
}
// 设置状态
export function setStatus (data) {
  return _fetch({
    url: '/enterprise/status',
    data,
    method: 'post'
  })
}
// 删除
export function delList (data) {
  return _fetch({
    url: '/enterprise/remove',
    data,
    method: 'post'
  })
}

export function addList (data) {
  return _fetch({
    url: '/enterprise/edit',
    data,
    method: 'post'
  })
}
export function editList (data) {
  return _fetch({
    url: '/enterprise/edit',
    data,
    method: 'post'
  })
}
