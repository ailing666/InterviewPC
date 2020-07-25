import _fetch from '@/util/fetch.js'
export function getSubjectList (params) {
  return _fetch({
    url: '/subject/list',
    params
  })
}

export function setStatus (data) {
  return _fetch({
    url: '/subject/status',
    data,
    method: 'post'
  })
}
export function delList (data) {
  return _fetch({
    url: '/subject/remove',
    data,
    method: 'post'
  })
}
