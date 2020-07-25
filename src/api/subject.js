import _fetch from '@/util/fetch.js'
export function getSubjectList (params) {
  return _fetch({
    url: '/subject/list',
    params
  })
}
// 设置状态
export function setStatus (data) {
  return _fetch({
    url: '/subject/status',
    data,
    method: 'post'
  })
}
// 删除
export function delList (data) {
  return _fetch({
    url: '/subject/remove',
    data,
    method: 'post'
  })
}

export function addList (data) {
  return _fetch({
    url: '/subject/add',
    data,
    method: 'post'
  })
}
export function editList (data) {
  return _fetch({
    url: '/subject/edit',
    data,
    method: 'post'
  })
}
